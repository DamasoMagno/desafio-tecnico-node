import { IOrder } from "@/infra/database/schema/Order";
import { paginate } from "@/utils/pagination";
import { IOrderRepository } from "@/infra/repositories/IOrderRepository";

interface ListOrdersDTO {
  state: IOrder["state"] | undefined;
  page: string;
  limit: string;
}

class GetDeleteOrdersService {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ state, page, limit }: ListOrdersDTO) {
    const { skip, limit: limitNumber } = paginate(page, limit);

    return await this.orderRepository.listDeleted({
      state: state,
      skip,
      limit: limitNumber,
    });
  }
}
export { GetDeleteOrdersService };
