import { sign } from "jsonwebtoken";
import { InvalidCredentials } from "@/core/errors/invalid-credentials";
import bcrypt from "bcryptjs";
import { IUserRepository } from "@/infra/repositories/IUserRepository";

interface User {
  email: string;
  password: string;
}

class AuthenticateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: User) {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (!existingUser) {
      throw new InvalidCredentials("Email/password incorrect");
    }

    const hashedPassword = await bcrypt.compare(
      userData.password,
      existingUser.password
    );

    if (!hashedPassword) {
      throw new InvalidCredentials("Email/password incorrect");
    }

    const token = sign({}, "your-secret-token", {
      subject: existingUser.email,
      expiresIn: "7d",
    });

    return token;
  }
}

export { AuthenticateUserService };
