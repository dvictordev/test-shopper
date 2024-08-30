import { model } from "../google";
import * as fs from "fs";

import {
  BillPropsRequest,
  ReadsRepository,
} from "../repositories/measures-interface-repository";
import { fileToGenerativePart } from "../utils/convertToFilePart";
import { generateUrl } from "../utils/generateUrl";
import { AlreadyExisteReadOnDate } from "./errors/already-existe-measure-on-date-error";

export class UploadUseCase {
  constructor(private readsRepository: ReadsRepository) {}

  async execute({
    customer_code,
    image,
    measure_datetime,
    measure_type,
  }: BillPropsRequest) {
    const alreadyExisteMeasuresOnDate =
      await this.readsRepository.findByDateAndType(
        measure_datetime,
        measure_type
      );

    if (alreadyExisteMeasuresOnDate) {
      throw new AlreadyExisteReadOnDate(
        "DOUBLE_REPORT",
        "Leitura do mês já realizada"
      );
    }

    const { uri } = await generateUrl(image);

    const prompt = `Preciso que voce identifique o valor do medidor dessa conta de ${measure_type} e retorne apenas o valor`;

    const file = fileToGenerativePart(image, "image/jpeg");

    const { response } = await model.generateContent([prompt, file]);

    const value = Number(response.text().match(/\d+/));

    const reading = await this.readsRepository.upload({
      customer_code,
      measure_date: measure_datetime,
      value,
    });

    return {
      image_url: uri,
      measure_value: reading?.value,
      measure_uuid: reading?.id,
    };
  }
}
