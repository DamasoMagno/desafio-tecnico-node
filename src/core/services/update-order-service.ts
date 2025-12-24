import { IOrderRepository } from "@/infra/repositories/IOrderRepository";

interface OrderDTO {
  orderId: string;
  lab: string;
  patient: string;
  customer: string;
  state: "CREATED" | "ANALYSIS" | "COMPLETED";
}

class UpdateOrderService {
  private readonly orderState = ["CREATED", "ANALYSIS", "COMPLETED"];

  constructor(private orderRepository: IOrderRepository) {}

  async execute({ customer, lab, orderId, patient, state }: OrderDTO) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new Error("Order not found.");
    }

    const orderState = existingOrder?.state;

    const currentState = this.orderState.indexOf(orderState);
    const newState = this.orderState.indexOf(state);

    if (newState === -1) {
      throw new Error("Invalid state provided.");
    }

    if (newState < currentState) {
      throw new Error(
        `Invalid state transition from ${orderState} to ${state}.`
      );
    }

    if (newState > currentState + 1) {
      throw new Error(
        `Cannot skip states. Next step should be ${
          this.orderState[currentState + 1]
        }.`
      );
    }

    await this.orderRepository.update(orderId, {
      lab: lab,
      patient: patient,
      customer: customer,
      state: state,
    });
  }
}

export { UpdateOrderService };
