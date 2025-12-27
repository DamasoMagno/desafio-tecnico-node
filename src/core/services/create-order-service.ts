import { IOrderRepository } from "@/infra/repositories/IOrderRepository";
import { EntityError } from "../errors/entity-error";

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
  constructor(private orderRepository: IOrderRepository) {}

  async execute(orderData: OrderDTO) {
    const hasServices = orderData.services && orderData.services.length > 0;

    if (!hasServices) {
      throw new EntityError("An order must contain at least one service.");
    }

    const serviceHasAnyValueLessThanOrEqualToZero = orderData.services.reduce(
      (acc, service) => (acc += service.value),
      0
    );

    if (serviceHasAnyValueLessThanOrEqualToZero === 0) {
      throw new EntityError(
        "The value of the services must be greater than zero."
      );
    }

    await this.orderRepository.create({
      lab: orderData.lab,
      patient: orderData.patient,
      customer: orderData.customer,
      state: "CREATED",
      status: "ACTIVE",
      services: orderData.services.map((service) => ({
        name: service.name,
        value: service.value,
        status: "PENDING",
      })),
    });
  }
}

export { CreateOrderService };
