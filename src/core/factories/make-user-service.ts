import { AuthenticateUserService } from "@/core/services/authenticate-user-service";
import { CreateUserService } from "@/core/services/create-user-service";
import { GetAuthenticateUserService } from "@/core/services/get-authenticate-user-service";
import { UserRepository } from "@/core/repositories/mongoose/User";

const userRepository = new UserRepository();

export function makeCreateUserService() {
  return new CreateUserService(userRepository);
}

export function makeGetAuthenticateUserService() {
  return new GetAuthenticateUserService(userRepository);
}

export function makeAuthenticateUserService() {
  return new AuthenticateUserService(userRepository);
}
