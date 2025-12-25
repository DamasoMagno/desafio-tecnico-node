import { IOrder } from "@/infra/database/schema/Order";
import { OrderRepository } from "../repositories/mongoose/Order";
import { paginate } from "@/utils/pagination";

interface ListOrdersDTO {
  state: IOrder["state"] | undefined;
  page: string;
  limit: string;
}

class GetOrdersService {
  private orderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({ state, page, limit }: ListOrdersDTO) {
    const { skip, limit: limitNumber } = paginate(page, limit);

    return await this.orderRepository.list({
      state: state,
      skip,
      limit: limitNumber,
    });
  }
}
export { GetOrdersService };
