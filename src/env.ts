import { z } from "zod";
import "dotenv/config";
import { InvalidEnvironment } from "./core/errors/invalid-environment";

export const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

const envValid = envSchema.safeParse(process.env);

if (!envValid.success) {
  console.error("❌ Invalid environment variables:", envValid.error.format());
  throw new InvalidEnvironment("Invalid environment variables.");
}

export const env = envValid.data;
