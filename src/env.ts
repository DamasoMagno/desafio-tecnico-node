import { z } from "zod";
import "dotenv/config";

export const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

export const env = envSchema.parse(process.env);
