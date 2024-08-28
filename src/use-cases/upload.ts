import { model } from "../google";
import * as fs from "fs";

import {
  BillPropsRequest,
  BillsRepository,
} from "../repositories/bills-interface-repository";
import { fileToGenerativePart } from "../utils/convertToFilePart";
import { generateUrl } from "../utils/generateUrl";

export class UploadUseCase {
  constructor(private billsRepository: BillsRepository) {}

  async execute({
    customer_code,
    image,
    measure_datetime,
    measure_type,
  }: BillPropsRequest) {
    const imagePath = generateUrl(image);
    const prompt = `Preciso que voce identifique o valor do medidor dessa conta de ${measure_type} e retorne apenas o valor`;

    const file = fileToGenerativePart(image, "image/jpeg");

    const { response } = await model.generateContent([prompt, file]);

    const value = Number(response.text().match(/\d+/));

    const reading = await this.billsRepository.upload({
      image_url: imagePath,
      measure_value: value,
    });

    //define o tempo em que o arquivo sera excluido.
    //esta definido para 5 minutos, caso seja desejado mais tempo é necessario alterar.
    setTimeout(() => {
      fs.unlinkSync(imagePath);
    }, 300000);

    return reading;
  }
}
