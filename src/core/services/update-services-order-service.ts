import { IOrderRepository } from "@/infra/repositories/IOrderRepository";
import { EntityNotFound } from "../errors/not-found";
import { EntityError } from "../errors/entity-error";

interface OrderDTO {
  services: {
    name: string;
    value: number;
  }[];
  orderId: string;
}

class UpdateServicesOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId, services }: OrderDTO) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new EntityNotFound("Order not found.");
    }

    if (existingOrder.status === "DELETED") {
      throw new EntityError("Cannot advance a deleted order.");
    }

    await this.orderRepository.updateServices({
      orderId,
      services,
    });
  }
}

export { UpdateServicesOrderService };
