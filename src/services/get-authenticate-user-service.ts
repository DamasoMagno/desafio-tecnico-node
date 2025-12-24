import { EntityNotFound } from "../errors/not-found";
import { UserRepository } from "../repositories/mongoose/User";

interface User {
  userId: string;
}

class GetAuthenticateUserService {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: User) {
    const existingUser = await this.userRepository.findById(userData.userId);

    if (!existingUser) {
      throw new EntityNotFound("User not found");
    }

    return;
  }
}

export { GetAuthenticateUserService };
