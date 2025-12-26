import { z } from "zod";
import "dotenv/config";

export const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

const envValid = envSchema.safeParse(process.env);

if (!envValid.success) {
  console.error("❌ Invalid environment variables:", envValid.error.format());
  throw new Error("Invalid environment variables.");
}

export const env = envValid.data;
