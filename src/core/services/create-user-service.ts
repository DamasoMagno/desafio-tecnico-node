import { IUserRepository } from "@/infra/repositories/IUserRepository";

interface User {
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: User) {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    await this.userRepository.register({
      email: userData.email,
      password: userData.password,
    });
  }
}

export { CreateUserService };
