import { IOrder } from "../database/schema/Order";

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | null>;
  create(data: Partial<IOrder>): Promise<IOrder>;
  update(id: string, data: Partial<IOrder>): Promise<IOrder | null>;
  list(filter: object, skip: number, limit: number): Promise<IOrder[]>;
  delete(id: string): Promise<IOrder | null>;
}
