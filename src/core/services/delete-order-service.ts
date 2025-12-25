import { OrderRepository } from "../repositories/mongoose/Order";

interface OrderDTO {
  orderId: string;
}

class DeleteOrderService {
  private orderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ orderId }: OrderDTO) {
    await this.orderRepository.update(orderId, {
      status: "DELETED",
    });
  }
}

export { DeleteOrderService };
