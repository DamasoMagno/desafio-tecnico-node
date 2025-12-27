import { IOrderRepository } from "@/infra/repositories/IOrderRepository";
import { EntityNotFound } from "../errors/not-found";

interface OrderDTO {
  orderId: string;
}

class DeleteOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId }: OrderDTO) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new EntityNotFound("Order not found");
    }

    await this.orderRepository.update(orderId, {
      status: "DELETED",
    });
  }
}

export { DeleteOrderService };
