import { OrderRepository } from "../repositories/mongoose/Order";

interface OrderDTO {
  lab: string;
  patient: string;
  customer: string;
  services: {
    name: string;
    value: number;
  }[];
}

class CreateOrderService {
  private orderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData: OrderDTO) {
    await this.orderRepository.create({
      lab: orderData.lab,
      patient: orderData.patient,
      customer: orderData.customer,
      state: "CREATED",
      status: "ACTIVE",
    });
  }
}

export { CreateOrderService };
