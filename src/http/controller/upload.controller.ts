import { FastifyReply, FastifyRequest } from "fastify";

import { UploadUseCase } from "../../use-cases/upload";
import { validateImageBase } from "../../utils/validate-image-base";
import { z, ZodError } from "zod";
import { PrismaMeasureRepository } from "../../repositories/prisma/prisma-measure-repository";
import { MeasuresInMemoryRepositories } from "../../repositories/in-memory/bills-in-memory-repository";
import { AlreadyExisteMeasuresOnDate } from "../../use-cases/errors/already-existe-measure-on-date-error";

export async function uploadController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const uploadBodySchema = z.object({
      image: z.string(),
      customer_code: z.string(),
      measure_datetime: z.string(),
      measure_type: z.enum(["WATER", "GAS"]).default("WATER"),
    });

    const { customer_code, image, measure_datetime, measure_type } =
      uploadBodySchema.parse(request.body);

    const isValidBase64 = validateImageBase(image);

    if (!isValidBase64) {
      throw new Error("base 64 invalido");
    }

    const uploadRepository = new PrismaMeasureRepository();
    const uploadUsecase = new UploadUseCase(uploadRepository);

    const readingMeasure = await uploadUsecase.execute({
      customer_code,
      image,
      measure_datetime,
      measure_type,
    });

    return readingMeasure;
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error_code: "INVALID_DATA",
        error_description: `${error.errors[0].path}: ${error.errors[0].message}`,
      });
    } else if (error instanceof AlreadyExisteMeasuresOnDate) {
      return reply.status(409).send({
        error_code: error.errorCode,
        error_description: error.message,
      });
    }

    return reply.send(error);
  }
}
