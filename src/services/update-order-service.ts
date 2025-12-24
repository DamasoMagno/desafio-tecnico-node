import { OrderRepository } from "../repositories/mongoose/Order";

interface OrderDTO {
  orderId: string;
  lab: string;
  patient: string;
  customer: string;
  state: "CREATED" | "ANALYSIS" | "COMPLETED";
}

class UpdateOrderService {
  private orderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ customer, lab, orderId, patient, state }: OrderDTO) {
    const existingOrder = await this.orderRepository.findById(orderId);
    const orderState = existingOrder?.state;

    if (state === "ANALYSIS" && orderState === "CREATED") {
      throw new Error("Invalid state transition");
    } else if (state === "COMPLETED" && orderState === "ANALYSIS") {
      throw new Error("Invalid state transition");
    } else if (state !== orderState) {
      throw new Error("Invalid state transition");
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
