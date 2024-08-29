import { Measures, MeasureType, Prisma } from "@prisma/client";

export interface BillPropsRequest {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: "WATER" | "GAS";
}

export interface BillsRepository {
  upload(data: Prisma.MeasuresCreateInput): Promise<Measures | null>;
  findByDateAndType(date: string, type: MeasureType): Promise<Measures | null>;
}
