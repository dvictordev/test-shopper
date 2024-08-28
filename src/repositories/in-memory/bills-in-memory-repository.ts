import { randomUUID } from "crypto";
import { BillsRepository, BillProps } from "../bills-interface-repository";

export class BillsInMemoryRepository implements BillsRepository {
  public bills: any = [];

  async upload(data: BillProps): Promise<BillProps> {
    const bill = {
      measure_uuid: randomUUID(),
      measure_value: data.measure_value,
      image_url: data.image_url,
    };

    this.bills.push(bill);

    return bill;
  }
}
