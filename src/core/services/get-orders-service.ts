import { OrderRepository } from "../repositories/mongoose/Order";

interface ListOrdersDTO {
  filter: object;
  skip: number;
  limit: number;
}

class CreateOrderService {
  private orderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ filter, skip, limit }: ListOrdersDTO) {
    return await this.orderRepository.list(filter, skip, limit);
  }
}
export { CreateOrderService };
