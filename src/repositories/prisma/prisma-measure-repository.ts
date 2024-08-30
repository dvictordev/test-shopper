import { Prisma, Measures, MeasureType } from "@prisma/client";
import { ReadsRepository } from "../measures-interface-repository";
import { prisma } from "../../db/prisma";

export class PrismaMeasureRepository implements ReadsRepository {
  async upload({
    customer_code,
    measure_date,
    value,
    confirmed,
    id,
    measure_type,
  }: Prisma.MeasuresCreateInput): Promise<Measures> {
    const measure = await prisma.measures.create({
      data: {
        customer_code,
        value,
        measure_date: new Date(measure_date),
        measure_type,
      },
    });

    return measure;
  }

  async findByDateAndType(
    date: string,
    type: MeasureType
  ): Promise<Measures | null> {
    const measure = prisma.measures.findFirst({
      where: {
        measure_date: new Date(date),
        measure_type: type,
      },
    });

    return measure;
  }

  async findById(id: string): Promise<Measures | null> {
    const read = await prisma.measures.findUnique({
      where: {
        id,
      },
    });

    return read;
  }

  async updateRead(id: string, value: number): Promise<void> {
    await prisma.measures.update({
      where: {
        id,
      },
      data: {
        value,
        confirmed: new Date(),
      },
    });
  }

  async findManyByCustomer(
    customer_code: string,
    type?: MeasureType
  ): Promise<Measures[]> {
    const measures = await prisma.measures.findMany({
      where: {
        customer_code,
        measure_type: type ? type : undefined,
      },
    });

    return measures;
  }
}
