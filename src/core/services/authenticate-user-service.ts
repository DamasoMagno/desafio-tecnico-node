import { sign } from "jsonwebtoken";
import { InvalidCredentials } from "@/core/errors/invalid-credentials";
import bcrypt from "bcryptjs";
import { IUserRepository } from "@/infra/repositories/IUserRepository";
import { env } from "@/env";

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

    const token = sign({}, env.JWT_SECRET, {
      subject: existingUser._id.toString(),
      expiresIn: "7d",
    });

    return token;
  }
}

export { AuthenticateUserService };
