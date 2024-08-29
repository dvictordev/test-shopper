import { model } from "../google";
import * as fs from "fs";

import {
  BillPropsRequest,
  BillsRepository,
} from "../repositories/bills-interface-repository";
import { fileToGenerativePart } from "../utils/convertToFilePart";
import { generateUrl } from "../utils/generateUrl";
import { AlreadyExisteMeasuresOnDate } from "./errors/already-existe-measure-on-date-error";

export class UploadUseCase {
  constructor(private billsRepository: BillsRepository) {}

  async execute({
    customer_code,
    image,
    measure_datetime,
    measure_type,
  }: BillPropsRequest) {
    const alreadyExisteMeasuresOnDate =
      await this.billsRepository.findByDateAndType(
        measure_datetime,
        measure_type
      );

    if (alreadyExisteMeasuresOnDate) {
      throw new AlreadyExisteMeasuresOnDate(
        "DOUBLE_REPORT",
        "Leitura do mês já realizada"
      );
    }

    const { uri } = await generateUrl(image);

    const prompt = `Preciso que voce identifique o valor do medidor dessa conta de ${measure_type} e retorne apenas o valor`;

    const file = fileToGenerativePart(image, "image/jpeg");

    const { response } = await model.generateContent([prompt, file]);

    const value = Number(response.text().match(/\d+/));

    const reading = await this.billsRepository.upload({
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
