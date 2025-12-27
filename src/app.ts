import express, { Request, Response, NextFunction } from "express";

import cors from "cors";
export const app = express();

import { connectToDatabase } from "./infra/database/index";
import { userRoutes } from "./http/routes/user.route";
import { orderRoutes } from "./http/routes/order.route";
import { EntityNotFound } from "./core/errors/not-found";
import z from "zod";
import { InvalidCredentials } from "./core/errors/invalid-credentials";
import { EntityExists } from "./core/errors/entity-exists";
import { EntityError } from "./core/errors/entity-error";

connectToDatabase().catch((error) => {
  console.error("Database connection error:", error);
});

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(orderRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (
    error instanceof EntityNotFound ||
    error instanceof InvalidCredentials ||
    error instanceof EntityExists ||
    error instanceof EntityError
  ) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: error.message,
    });
  }

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: error.format(),
    });
  }

  if (error instanceof Error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});
