import { Order, IOrder } from "../../database/schema/Order";
import { IOrderRepository } from "../IOrderRepository";

export class OrderRepository implements IOrderRepository {
  async list(filter: object, skip: number, limit: number): Promise<IOrder[]> {
    const orders = await Order.find(filter).skip(skip).limit(limit);
    return orders;
  }
  async findById(id: string) {
    return Order.findById(id);
  }

  async create(data: Partial<IOrder>) {
    return Order.create(data);
  }

  async update(id: string, data: Partial<IOrder>) {
    return Order.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id: string) {
    return Order.findByIdAndDelete(id);
  }
}
