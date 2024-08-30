import { randomUUID } from "crypto";
import { MeasuresRepository } from "../measures-interface-repository";
import { Prisma, Measures, MeasureType } from "@prisma/client";

export class MeasuresInMemoryRepositories implements MeasuresRepository {
  public reads: Measures[] = [];

  async upload(data: Prisma.MeasuresCreateInput): Promise<Measures> {
    const measure: Measures = {
      confirmed: data.confirmed ? new Date(data.confirmed) : null,
      customer_code: data.customer_code,
      id: data.id ? data.id : randomUUID(),
      measure_date: new Date(data.measure_date),
      measure_type: data.measure_type ? data.measure_type : "WATER",
      value: data.value,
    };

    this.reads.push(measure);

    return measure;
  }

  async findByDateAndType(
    date: string,
    type: MeasureType
  ): Promise<Measures | null> {
    const measure = this.reads.find((item) => {
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

  async findById(id: string): Promise<Measures | null> {
    const measure = this.reads.find((item) => item.id === id);

    if (!measure) {
      return null;
    }

    return measure;
  }

  async updateRead(id: string, value: number): Promise<any> {
    const readIndex = this.reads.findIndex((item) => item.id === id);

    if (readIndex >= 0) {
      this.reads[readIndex].value = value;
      this.reads[readIndex].confirmed = new Date();
    }

    return this.reads[readIndex];
  }

  async findManyByCustomer(
    customer_code: string,
    type?: MeasureType
  ): Promise<Measures[]> {
    const measures = this.reads.filter(
      (item) =>
        item.customer_code == customer_code &&
        (!type || item.measure_type === type)
    );

    return measures;
  }
}
