import { Router } from "express";
const userRoutes = Router();

import { z } from "zod";
import { User } from "@/infra/database/schema/User.js";
import { AuthenticateUserService } from "@/core/services/authenticate-user-service";
import { CreateUserService } from "@/core/services/create-user-service";
import { GetAuthenticateUserService } from "@/core/services/get-authenticate-user-service";
import { UserRepository } from "@/core/repositories/mongoose/User";

import { authMiddleware } from "@/http/middleware/auth";

const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

const userRepository = new UserRepository();
const authenticateUserService = new AuthenticateUserService(userRepository);
const createUserService = new CreateUserService(userRepository);
const getAuthenticateUserService = new GetAuthenticateUserService(
  userRepository
);

userRoutes.post("/users", async (req, res) => {
  const { email, password } = createUserSchema.parse(req.body);

  await createUserService.execute({ email, password });
  res.status(201).json({ message: "User created successfully" });
});

userRoutes.get("/users/me", authMiddleware, async (req, res) => {
  const { id } = req.user;

  const existingUser = await getAuthenticateUserService.execute({ userId: id });
  res.status(200).json(existingUser);
});

userRoutes.post("/users/auth", async (req, res) => {
  const { email, password } = createUserSchema.parse(req.body);

  const token = await authenticateUserService.execute({ email, password });

  res.status(201).json({
    token,
  });
});

userRoutes.get("/users", async (req, res) => {
  const existingUser = await User.find();

  res.status(201).json(existingUser);
});

export { userRoutes };
