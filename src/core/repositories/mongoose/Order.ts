import { Order, IOrder } from "@/infra/database/schema/Order";
import { IOrderRepository } from "@/infra/repositories/IOrderRepository";

interface IListOrdersDTO {
  state: IOrder["state"] | undefined;
  skip: number;
  limit: number;
}

interface IOrderQuery {
  status: string;
  state?: IOrder["state"];
}

export class OrderRepository implements IOrderRepository {
  async list({ state, skip, limit }: IListOrdersDTO): Promise<IOrder[]> {
    const query: IOrderQuery = {
      status: "ACTIVE",
    };

    if (state) {
      query.state = state;
    }

    const orders = await Order.find(query).skip(skip).limit(limit).lean();
    return orders;
  }

  async findById(id: string) {
    return Order.findOne({
      _id: id,
      status: "ACTIVE",
    }).lean();
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
