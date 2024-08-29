import { beforeEach, describe, expect, it, vitest } from "vitest";
import { UploadUseCase } from "./upload";
import { MeasuresInMemoryRepositories } from "../repositories/in-memory/bills-in-memory-repository";
import { BillsRepository } from "../repositories/bills-interface-repository";
import { billBase64Example } from "../utils/bill-base64-example";
import { AlreadyExisteMeasuresOnDate } from "../use-cases/errors/already-existe-measure-on-date-error";

let uploadUseCase: UploadUseCase;
let billsRepository: BillsRepository;
describe("Upload Use Case", () => {
  beforeEach(() => {
    billsRepository = new MeasuresInMemoryRepositories();
    uploadUseCase = new UploadUseCase(billsRepository);
  });

  it("should be able to upload an image and get the value of the measure", async () => {
    const response = await uploadUseCase.execute({
      image: billBase64Example,
      customer_code: "123456",
      measure_datetime: "2024-08-28",
      measure_type: "WATER",
    });

    expect(response).toEqual(
      expect.objectContaining({
        measure_uuid: expect.any(String),
        measure_value: expect.any(Number),
        image_url: expect.any(String),
      })
    );

    expect(response.measure_value).toEqual(935924);
  });

  it("should not be able to get the measure of the same accoun twice", async () => {
    await billsRepository.upload({
      customer_code: "123456",
      value: 12345,
      measure_date: new Date("2024-08-29"),
    });

    await expect(() =>
      uploadUseCase.execute({
        image: billBase64Example,
        customer_code: "123456",
        measure_datetime: "2024-08-29",
        measure_type: "WATER",
      })
    ).rejects.toBeInstanceOf(AlreadyExisteMeasuresOnDate);
  });
});
