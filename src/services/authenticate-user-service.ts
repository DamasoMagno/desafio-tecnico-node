import { sign } from "jsonwebtoken";
import { InvalidCredentials } from "../errors/invalid-credentials";
import { UserRepository } from "../repositories/mongoose/User";
import bcrypt from "bcryptjs";

interface User {
  email: string;
  password: string;
}

class AuthenticateUserService {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: User) {
    const existingUser = await this.userRepository.fincByEmail(userData.email);

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
      subject: existingUser._id.toString(),
      expiresIn: "7d",
    });

    return token;
  }
}

export { AuthenticateUserService };
