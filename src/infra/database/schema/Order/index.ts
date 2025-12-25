import { Document, Schema, model } from "mongoose";
import { serviceSchema } from "./service";

interface IService {
  name: string;
  value: number;
  status: "PENDING" | "DONE";
}

export interface IOrder extends Document {
  lab: string;
  patient: string;
  customer: string;
  state: "CREATED" | "ANALYSIS" | "COMPLETED";
  status: "ACTIVE" | "DELETED";
  services: IService[];
}

const orderSchema = new Schema<IOrder>({
  lab: { type: String, required: true },
  patient: { type: String, required: true },
  customer: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ["CREATED", "ANALYSIS", "COMPLETED"],
    default: "CREATED",
  },
  status: {
    type: String,
    enum: ["ACTIVE", "DELETED"],
    default: "ACTIVE",
  },
  services: {
    type: [serviceSchema],
    required: true,
  },
});

export const Order = model("Order", orderSchema);
