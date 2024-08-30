import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { PrismaMeasureRepository } from "../../repositories/prisma/prisma-measure-repository";
import { InvalidReadError } from "../../use-cases/errors/invalid-measure-error";
import { GetMeausureUseCase } from "../../use-cases/get-measures";
import { MeasureType } from "@prisma/client";

export async function getMeasuresController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getMeasuresParamSchema = z.object({
      customer_code: z.string(),
    });

    const getMeasureQuerySchema = z.object({
      measure_type: z
        .string()
        .optional()
        .transform((val) => val?.toUpperCase())
        .refine((val) => val === undefined || ["WATER", "GAS"].includes(val), {
          message: "Tipo de medição não permitida",
        })
        .transform((val) => val as MeasureType),
    });

    const { customer_code } = getMeasuresParamSchema.parse(request.params);

    const { measure_type } = getMeasureQuerySchema.parse(request.query);

    const prismaMeasureRepository = new PrismaMeasureRepository();
    const getMeasuresUseCase = new GetMeausureUseCase(prismaMeasureRepository);

    const confirmed = await getMeasuresUseCase.execute({
      customer_code,
      measure_type,
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
