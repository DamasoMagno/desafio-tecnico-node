import { IUserRepository } from "@/infra/repositories/IUserRepository";
import { EntityExists } from "../errors/entity-exists";
import { hash } from "bcryptjs";

interface User {
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: User) {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new EntityExists("User already exists with this email.");
    }

    const hashedPassword = await hash(userData.password, 10);

    await this.userRepository.register({
      email: userData.email,
      password: hashedPassword,
    });
  }
}

export { CreateUserService };
