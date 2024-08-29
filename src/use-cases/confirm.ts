import { ReadsRepository } from "../repositories/bills-interface-repository";

import { InvalidReadError } from "./errors/invalid-measure-error";
interface ConfirmPropsRequest {
  readId: string;
  confirmed_value: number;
}
export class ConfirmUseCase {
  constructor(private readsRepository: ReadsRepository) {}

  async execute({ confirmed_value, readId }: ConfirmPropsRequest) {
    const read = await this.readsRepository.findById(readId);

    if (!read) {
      throw new InvalidReadError(
        "MEASURE_NOT_FOUND",
        "Leitura não encontrada",
        404
      );
    }

    if (read.confirmed != null) {
      throw new InvalidReadError(
        "CONFIRMATION_DUPLICATE",
        "Leitura do mês já confirmada",
        409
      );
    }

    await this.readsRepository.updateRead(readId, confirmed_value);

    return {
      success: true,
    };
  }
}
