import { Router } from "express";
const userRoutes = Router();
import { authMiddleware } from "@/http/middleware/auth";

import { UserController } from "../controllers/user";
const userController = new UserController();

userRoutes.post("/users", userController.createUser.bind(userController));

userRoutes.get(
  "/users/me",
  authMiddleware,
  userController.getAuthenticatedUser.bind(userController)
);

userRoutes.post(
  "/users/auth",
  userController.authenticateUser.bind(userController)
);

export { userRoutes };
