import { OrderRepository } from "../repositories/mongoose/Order";
import { UserRepository } from "../repositories/mongoose/User";
import { CreateOrderService } from "./create-order-service";

interface User {
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: User) {
    await this.userRepository.register({
      email: userData.email,
      password: userData.password,
    });
  }
}

export { CreateUserService };
