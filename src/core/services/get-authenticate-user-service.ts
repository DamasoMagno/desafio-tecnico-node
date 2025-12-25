import { EntityNotFound } from "@/core/errors/not-found";
import { IUserRepository } from "@/infra/repositories/IUserRepository";

interface User {
  userId: string;
}

class GetAuthenticateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: User) {
    const existingUser = await this.userRepository.findByEmail(userData.userId);

    if (!existingUser) {
      throw new EntityNotFound("User not found");
    }

    return existingUser;
  }
}

export { GetAuthenticateUserService };
