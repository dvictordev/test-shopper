export interface BillPropsRequest {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: "WATER" | "GAS";
}

export interface BillProps {
  measure_uuid?: string;
  measure_value: number;
  image_url: string;
}
export interface BillsRepository {
  upload(data: BillProps): Promise<BillProps | null>;
}
