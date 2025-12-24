import { OrderRepository } from "../repositories/mongoose/Order";

interface ListOrdersDTO {
  orderId: string;
}

class GetOrderService {
  private orderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ orderId }: ListOrdersDTO) {
    return await this.orderRepository.findById(orderId);
  }
}
export { GetOrderService };
