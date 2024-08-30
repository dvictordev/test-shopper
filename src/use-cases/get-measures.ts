import { MeasureType } from "@prisma/client";
import { ReadsRepository } from "../repositories/measures-interface-repository";

import { InvalidReadError } from "./errors/invalid-measure-error";
interface ConfirmPropsRequest {
  customer_code: string;
  measure_type?: MeasureType;
}
export class ConfirmUseCase {
  constructor(private readsRepository: ReadsRepository) {}

  async execute({ customer_code, measure_type }: ConfirmPropsRequest) {
    const measures = await this.readsRepository.findManyByCustomer(
      customer_code,
      measure_type
    );

    // if (!read) {
    //   throw new InvalidReadError(
    //     "MEASURE_NOT_FOUND",
    //     "Leitura não encontrada",
    //     404
    //   );
    // }

    // if (read.confirmed != null) {
    //   throw new InvalidReadError(
    //     "CONFIRMATION_DUPLICATE",
    //     "Leitura do mês já confirmada",
    //     409
    //   );
    // }

    return {
      success: true,
    };
  }
}
