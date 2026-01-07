import { IOrderRepository } from "@/infra/repositories/IOrderRepository";
import { EntityNotFound } from "../errors/not-found";
import { EntityError } from "../errors/entity-error";

interface CommentDTO {
  orderId: string;
  content: string;
}

class CreateCommentService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ orderId, content }: CommentDTO) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new EntityNotFound("Order not found.");
    }

    if (existingOrder.status === "DELETED") {
      throw new EntityError("Cannot advance a deleted order.");
    }

    await this.orderRepository.createComment(orderId, content);
  }
}

export { CreateCommentService };
