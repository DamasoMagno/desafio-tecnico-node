import { Order, IOrder } from "@/infra/database/schema/Order";
import { IOrderRepository } from "@/infra/repositories/IOrderRepository";

interface IListOrdersDTO {
  state: IOrder["state"] | undefined;
  skip: number;
  limit: number;
}

export class OrderRepository implements IOrderRepository {
  async list({ state, skip, limit }: IListOrdersDTO): Promise<IOrder[]> {
    const orders = await Order.find(state ? { state } : {})
      .skip(skip)
      .limit(limit);
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
