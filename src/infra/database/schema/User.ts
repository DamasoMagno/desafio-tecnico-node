import { Schema, model } from "mongoose";
import z from "zod";

export interface IUser {
  _id: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model("User", userSchema);
