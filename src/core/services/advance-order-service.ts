import { IOrderRepository } from "@/infra/repositories/IOrderRepository";

interface OrderDTO {
  orderId: string;
}

class AdvanceOrderService {
  private readonly orderState = ["CREATED", "ANALYSIS", "COMPLETED"] as const;

  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId }: OrderDTO) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new Error("Order not found.");
    }

    const orderState = existingOrder?.state;

    const currentState = this.orderState.indexOf(orderState);
    const nextState = this.orderState[currentState + 1];

    if (!nextState) {
      throw new Error("The order is already in the final state.");
    }

    await this.orderRepository.update(orderId, {
      state: nextState,
    });
  }
}

export { AdvanceOrderService };
