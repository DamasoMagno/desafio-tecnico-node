import { IOrder } from "@/infra/database/schema/Order";

export interface ListOrders {
  state: IOrder["state"] | undefined;
  skip: number;
  limit: number;
}

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | null>;
  create(data: Partial<IOrder>): Promise<IOrder>;
  update(id: string, data: Partial<IOrder>): Promise<IOrder | null>;
  list({ state, skip, limit }: ListOrders): Promise<IOrder[]>;
  count({ state }: { state: IOrder["state"] | undefined }): Promise<number>;
  listDeleted({ state, skip, limit }: ListOrders): Promise<IOrder[]>;
  delete(id: string): Promise<IOrder | null>;
}
