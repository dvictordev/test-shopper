import { MeasureType } from "@prisma/client";
import { MeasuresRepository } from "../repositories/measures-interface-repository";

import { InvalidReadError } from "./errors/invalid-measure-error";
interface GetMeasuresPropsRequest {
  customer_code: string;
  measure_type?: MeasureType | null;
}
export class GetMeausureUseCase {
  constructor(private readsRepository: MeasuresRepository) {}

  async execute({ customer_code, measure_type }: GetMeasuresPropsRequest) {
    const measures = await this.readsRepository.findManyByCustomer(
      customer_code,
      measure_type
    );

    if (measures.length <= 0) {
      throw new InvalidReadError(
        "MEASURES_NOT_FOUND",
        "Nenhuma leitura encontrada",
        404
      );
    }

    return {
      customer_code,
      measures,
    };
  }
}
