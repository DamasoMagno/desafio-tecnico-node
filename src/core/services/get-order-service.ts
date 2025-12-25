import { IOrderRepository } from "@/infra/repositories/IOrderRepository";

interface ListOrdersDTO {
  orderId: string;
}

class GetOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId }: ListOrdersDTO) {
    return await this.orderRepository.findById(orderId);
  }
}
export { GetOrderService };
