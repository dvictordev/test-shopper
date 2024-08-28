import { beforeEach, describe, expect, it } from "vitest";
import { UploadUseCase } from "./upload";
import { BillsInMemoryRepository } from "../repositories/in-memory/bills-in-memory-repository";
import { BillsRepository } from "../repositories/bills-interface-repository";
import { billBase64Example } from "../utils/bill-base64-example";

let uploadUseCase: UploadUseCase;
let billsRepository: BillsRepository;
describe("Upload Use Case", () => {
  beforeEach(() => {
    billsRepository = new BillsInMemoryRepository();
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

    expect(response?.measure_value).toEqual(935924);
  });
});
