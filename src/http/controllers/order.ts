import { Router } from "express";
const orderRoutes = Router();

import { UpdateOrderService } from "@/core/services/update-order-service";
import { CreateOrderService } from "@/core/services/create-order-service";
import { DeleteOrderService } from "@/core/services/delete-order-service";
import { GetOrderService } from "@/core/services/get-order-service";
import { OrderRepository } from "@/core/repositories/mongoose/Order";

import { z } from "zod";
import { Order } from "@/infra/database/schema/Order";
import { paginationSchema } from "@/http/schemas/pagination";
import { createOrder } from "../schemas/order";
import { authMiddleware } from "../middleware/auth";

const orderRepository = new OrderRepository();
const createOrderService = new CreateOrderService(orderRepository);
const getOrderService = new GetOrderService(orderRepository);
const updateOrderService = new UpdateOrderService(orderRepository);
const deleteOrderService = new DeleteOrderService(orderRepository);

const paginationOrderSchema = paginationSchema.extend({
  state: z.string().optional(),
});

orderRoutes.post("/orders", authMiddleware, async (req, res) => {
  const { lab, patient } = createOrder.parse(req.body);

  await Order.create({
    lab,
    patient,
    state: "CREATED",
    status: "ACTIVE",
  });

  res.status(201).json({ message: "Order created successfully" });
});

orderRoutes.get("/orders", authMiddleware, async (req, res) => {
  const {
    page = "1",
    limit = "10",
    state,
  } = paginationOrderSchema.parse(req.query);

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const skip = (pageNumber - 1) * limitNumber;

  const orders = await Order.find(state ? { state } : {})
    .skip(skip)
    .limit(limitNumber);
  res.json(orders);
});

orderRoutes.patch("/orders/:id/advance", authMiddleware, async (req, res) => {
  const {
    page = "1",
    limit = "10",
    state,
  } = paginationOrderSchema.parse(req.query);

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  const skip = (pageNumber - 1) * limitNumber;

  const orders = await Order.find(state ? { state } : {})
    .skip(skip)
    .limit(limitNumber);
  res.json(orders);
});

export { orderRoutes };
