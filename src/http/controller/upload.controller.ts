import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import { UploadUseCase } from "../../use-cases/upload";
import { BillsInMemoryRepository } from "../../repositories/in-memory/bills-in-memory-repository";

export async function uploadController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const uploadBodySchema = z.object({
    image: z.string(),
    customer_code: z.string(),
    measure_datetime: z.string(),
    measure_type: z.enum(["WATER", "GAS"]).default("WATER"),
  });

  const { customer_code, image, measure_datetime, measure_type } =
    uploadBodySchema.parse(request.body);

  try {
    const uploadRepository = new BillsInMemoryRepository();
    const uploadUseCase = new UploadUseCase(uploadRepository);

    const reading = await uploadUseCase.execute({
      customer_code,
      image,
      measure_datetime,
      measure_type,
    });

    return reply.status(200).send(reading);
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error_code: "INVALID_DATA",
        error_description: error.message,
      });
    } else {
      return reply.send(error);
    }
  }
}
