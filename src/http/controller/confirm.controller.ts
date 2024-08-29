import { FastifyReply, FastifyRequest } from "fastify";

import { UploadUseCase } from "../../use-cases/upload";
import { validateImageBase } from "../../utils/validate-image-base";
import { z, ZodError } from "zod";
import { PrismaMeasureRepository } from "../../repositories/prisma/prisma-measure-repository";
import { MeasuresInMemoryRepositories } from "../../repositories/in-memory/bills-in-memory-repository";
import { AlreadyExisteReadOnDate } from "../../use-cases/errors/already-existe-measure-on-date-error";
import { ConfirmUseCase } from "../../use-cases/confirm";
import { InvalidReadError } from "../../use-cases/errors/invalid-measure-error";

export async function confirmController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const confirmBodySchema = z.object({
      measure_uuid: z.string(),
      confirmed_value: z.number(),
    });

    const { confirmed_value, measure_uuid } = confirmBodySchema.parse(
      request.body
    );

    const prismaMeasureRepository = new PrismaMeasureRepository();
    const confirmUseCase = new ConfirmUseCase(prismaMeasureRepository);

    const confirmed = await confirmUseCase.execute({
      confirmed_value,
      readId: measure_uuid,
    });

    return reply.status(200).send(confirmed);
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error_code: "INVALID_DATA",
        error_description: `${error.errors[0].path}: ${error.errors[0].message}`,
      });
    } else if (error instanceof InvalidReadError) {
      return reply.status(error.statusCode).send({
        error_code: error.errorCode,
        error_description: error.message,
      });
    }

    return reply.send(error);
  }
}
