import { beforeEach, describe, expect, it } from "vitest";
import { MeasuresInMemoryRepositories } from "../repositories/in-memory/measures-in-memory-repository";

import { GetMeausureUseCase } from "./get-measures";
import { randomUUID } from "crypto";
import { InvalidReadError } from "./errors/invalid-measure-error";

let getMeasuresUseCase: GetMeausureUseCase;
let measuresRepository: MeasuresInMemoryRepositories;
describe("Upload Use Case", () => {
  beforeEach(() => {
    measuresRepository = new MeasuresInMemoryRepositories();
    getMeasuresUseCase = new GetMeausureUseCase(measuresRepository);
  });

  it("should be able to list many measures by customer", async () => {
    await measuresRepository.upload({
      customer_code: "12345",
      measure_date: new Date("2024-08-29"),
      value: 123456,
      measure_type: "WATER",
      id: randomUUID(),
    });

    const response = await getMeasuresUseCase.execute({
      customer_code: "12345",
      measure_type: "WATER",
    });

    expect(response.customer_code).toEqual("12345");
  });

  it("should not be able to list inexistent measures by customer", async () => {
    await measuresRepository.upload({
      customer_code: "12345",
      measure_date: new Date("2024-08-29"),
      value: 123456,
      measure_type: "WATER",
      id: randomUUID(),
    });

    await expect(() =>
      getMeasuresUseCase.execute({
        customer_code: "123456",
        measure_type: "WATER",
      })
    ).rejects.toBeInstanceOf(InvalidReadError);
  });
});
