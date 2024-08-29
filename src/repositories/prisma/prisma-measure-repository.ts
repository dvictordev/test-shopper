import { Prisma, Measures, MeasureType } from "@prisma/client";
import { BillsRepository } from "../bills-interface-repository";
import { prisma } from "../../db/prisma";

export class PrismaMeasureRepository implements BillsRepository {
  async upload(data: Prisma.MeasuresCreateInput): Promise<Measures | null> {
    const measure = await prisma.measures.create({
      data,
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
}
