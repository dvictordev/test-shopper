import { randomUUID } from "crypto";
import { BillsRepository } from "../bills-interface-repository";
import { Prisma, Measures, MeasureType } from "@prisma/client";

export class MeasuresInMemoryRepositories implements BillsRepository {
  public measures: Measures[] = [];

  async upload(data: Prisma.MeasuresCreateInput): Promise<Measures | null> {
    const measure: Measures = {
      confirmed: null,
      customer_code: "12341234",
      id: data.id ? data.id : randomUUID(),
      measure_date: new Date(data.measure_date),
      measure_type: data.measure_type ? data.measure_type : "WATER",
      value: data.value,
    };

    this.measures.push(measure);

    return measure;
  }

  async findByDateAndType(
    date: string,
    type: MeasureType
  ): Promise<Measures | null> {
    const measure = this.measures.find((item) => {
      const itemDate = new Date(item.measure_date);
      return (
        itemDate.toDateString() === new Date(date).toDateString() &&
        item.measure_type === type
      );
    });

    if (!measure) {
      return null;
    }

    return measure;
  }
}
