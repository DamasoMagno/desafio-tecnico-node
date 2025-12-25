import { Schema } from "mongoose";

export interface IService {
  name: string;
  value: number;
  status: "PENDING" | "DONE";
}

export const serviceSchema = new Schema<IService>({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  status: {
    type: String,
    enum: ["PENDING", "DONE"],
    default: "PENDING",
  },
});
