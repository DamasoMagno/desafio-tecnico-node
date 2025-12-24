import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
export const app = express();

import { connectToDatabase } from "./database/index.js";
import { userRoutes } from "./routes/user.js";
import { EntityNotFound } from "./errors/not-found.js";
import z from "zod";

connectToDatabase()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(express.json());
app.use(cors());
app.use(userRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof EntityNotFound) {
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

  console.error(error);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});
