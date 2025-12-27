import { IOrderRepository } from "@/infra/repositories/IOrderRepository";
import { EntityNotFound } from "../errors/not-found";
import { EntityError } from "../errors/entity-error";

interface OrderDTO {
  orderId: string;
}

type OrderState = "CREATED" | "ANALYSIS" | "COMPLETED";

class AdvanceOrderService {
  private static readonly orderState = [
    "CREATED",
    "ANALYSIS",
    "COMPLETED",
  ] as const;

  constructor(private orderRepository: IOrderRepository) {}

  static advanceState(state: OrderState): OrderState {
    const currentState = this.orderState.indexOf(state);

    if (currentState === -1 || currentState === this.orderState.length - 1) {
      throw new EntityError("Cannot advance state.");
    }

    return this.orderState[currentState + 1];
  }

  async execute({ orderId }: OrderDTO) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new EntityNotFound("Order not found.");
    }

    if (existingOrder.status === "DELETED") {
      throw new EntityError("Cannot advance a deleted order.");
    }

    const state = AdvanceOrderService.advanceState(existingOrder.state);
    await this.orderRepository.update(orderId, {
      state,
    });
  }
}

export { AdvanceOrderService };
