import { beforeEach, describe, expect, it, vitest } from "vitest";
import { MeasuresInMemoryRepositories } from "../repositories/in-memory/measures-in-memory-repository";

import { ConfirmUseCase } from "./confirm";
import { InvalidReadError } from "./errors/invalid-measure-error";

let confirmUseCase: ConfirmUseCase;
let measuresRepository: MeasuresInMemoryRepositories;
describe("Upload Use Case", () => {
  beforeEach(() => {
    measuresRepository = new MeasuresInMemoryRepositories();
    confirmUseCase = new ConfirmUseCase(measuresRepository);
  });

  it("should be able to confirma a measure", async () => {
    const read = await measuresRepository.upload({
      customer_code: "12345",
      measure_date: new Date("2024-08-29"),
      value: 123456,
      measure_type: "WATER",
      id: "12345",
    });

    const response = await confirmUseCase.execute({
      readId: read.id,
      confirmed_value: 91345,
    });

    expect(response.success).toEqual(true);
  });

  it("should not be able to confirm a measure twice", async () => {
    const read = await measuresRepository.upload({
      confirmed: new Date("2024-08-29"),
      customer_code: "12345",
      measure_date: new Date("2024-08-29"),
      value: 123456,
      measure_type: "WATER",
      id: "12345",
    });

    await expect(() =>
      confirmUseCase.execute({
        readId: read.id,
        confirmed_value: 91345,
      })
    ).rejects.toBeInstanceOf(InvalidReadError);
  });
});
