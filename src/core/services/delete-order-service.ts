import { IOrderRepository } from "@/infra/repositories/IOrderRepository";

interface OrderDTO {
  orderId: string;
}

class DeleteOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId }: OrderDTO) {
    await this.orderRepository.update(orderId, {
      status: "DELETED",
    });
  }
}

export { DeleteOrderService };
