import { IOrderRepository } from "@/infra/repositories/IOrderRepository";
import { EntityNotFound } from "../errors/not-found";

interface ListOrdersDTO {
  orderId: string;
}

class GetOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId }: ListOrdersDTO) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new EntityNotFound("Order not found");
    }

    return order;
  }
}
export { GetOrderService };
