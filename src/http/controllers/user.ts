import { Request, Response } from "express";

import { z } from "zod";
import {
  makeAuthenticateUserService,
  makeCreateUserService,
  makeGetAuthenticateUserService,
} from "@/core/factories/make-user-service";

const createUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export class UserController {
  async createUser(req: Request, res: Response) {
    const { email, password } = createUserSchema.parse(req.body);
    const createUserService = makeCreateUserService();

    await createUserService.execute({ email, password });
    res.status(204).json();
  }

  async getAuthenticatedUser(req: Request, res: Response) {
    const { id } = req.user;
    console.log(req.user);
    const getAuthenticateUserService = makeGetAuthenticateUserService();

    const existingUser = await getAuthenticateUserService.execute({
      userId: id,
    });
    res.status(200).json(existingUser);
  }

  async authenticateUser(req: Request, res: Response) {
    const { email, password } = createUserSchema.parse(req.body);
    const authenticateUserService = makeAuthenticateUserService();

    const token = await authenticateUserService.execute({ email, password });
    res.status(200).json({ token });
  }
}
