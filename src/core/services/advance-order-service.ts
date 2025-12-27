import { IOrderRepository } from "@/infra/repositories/IOrderRepository";
import { EntityNotFound } from "../errors/not-found";
import { advanceState } from "@/utils/advance-state";

interface OrderDTO {
  orderId: string;
}

class AdvanceOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId }: OrderDTO) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new EntityNotFound("Order not found.");
    }

    if (existingOrder.status === "DELETED") {
      throw new EntityNotFound("Cannot advance a deleted order.");
    }

    const state = advanceState(existingOrder.state);
    await this.orderRepository.update(orderId, {
      state,
    });
  }
}

export { AdvanceOrderService };
