import { Router } from "express";
const orderRoutes = Router();

import { z } from "zod";
import { Order } from "@/database/schema/Order";

const createOrder = z.object({
  lab: z.string(),
  patient: z.string(),
});

const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  state: z.string().optional(),
});

orderRoutes.post("/orders", async (req, res) => {
  const { lab, patient } = createOrder.parse(req.body);

  await Order.create({
    lab,
    patient,
    state: "CREATED",
    status: "ACTIVE",
  });

  res.status(201).json({ message: "Order created successfully" });
});

orderRoutes.get("/orders", async (req, res) => {
  const { page = "1", limit = "10", state } = paginationSchema.parse(req.query);

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const skip = (pageNumber - 1) * limitNumber;

  const orders = await Order.find(state ? { state } : {})
    .skip(skip)
    .limit(limitNumber);
  res.json(orders);
});

orderRoutes.patch("/orders/:id/advance", async (req, res) => {
  const { page = "1", limit = "10", state } = paginationSchema.parse(req.query);

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const skip = (pageNumber - 1) * limitNumber;

  const orders = await Order.find(state ? { state } : {})
    .skip(skip)
    .limit(limitNumber);
  res.json(orders);
});

export { orderRoutes };
