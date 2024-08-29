import { Measures, MeasureType, Prisma } from "@prisma/client";

export interface BillPropsRequest {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: "WATER" | "GAS";
}

export interface ReadsRepository {
  upload(data: Prisma.MeasuresCreateInput): Promise<Measures>;
  findByDateAndType(date: string, type: MeasureType): Promise<Measures | null>;
  findById(id: string): Promise<Measures | null>;
  updateRead(id: string, value: number): Promise<void>;
}
