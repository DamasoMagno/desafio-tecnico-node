import { Request, Response } from "express";

import { z } from "zod";
import { paginationSchema } from "@/http/schemas/pagination";
import { createOrder, orderIdParam } from "../schemas/order";
import {
  makeAdvanceOrderService,
  makeCreateOrderService,
  makeDeleteOrderService,
  makeGetOrderService,
  makeGetOrdersService,
} from "@/core/factories/make-order-service";

const paginationOrderSchema = paginationSchema.extend({
  state: z.enum(["CREATED", "ANALYSIS", "COMPLETED"]).optional(),
});

export class OrderController {
  async createOrder(req: Request, res: Response) {
    const { lab, patient, customer, services } = createOrder.parse(req.body);
    const createOrderService = makeCreateOrderService();

    await createOrderService.execute({ lab, patient, customer, services });
    res.status(201).json();
  }

  async getOrder(req: Request, res: Response) {
    const { id } = orderIdParam.parse(req.params);
    const getOrderService = makeGetOrderService();

    const order = await getOrderService.execute({ orderId: id });
    res.status(200).json(order);
  }

  async listOrders(req: Request, res: Response) {
    const {
      page = "1",
      limit = "10",
      state,
    } = paginationOrderSchema.parse(req.query);
    const getOrdersService = makeGetOrdersService();

    const orders = await getOrdersService.execute({
      state,
      page,
      limit,
    });

    res.status(200).json(orders);
  }

  async advanceOrder(req: Request, res: Response) {
    const { id } = orderIdParam.parse(req.params);
    const advanceOrderService = makeAdvanceOrderService();

    await advanceOrderService.execute({ orderId: id });
    res.status(204).json();
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = orderIdParam.parse(req.params);
    const deleteOrderService = makeDeleteOrderService();

    await deleteOrderService.execute({ orderId: id });
    res.status(204).json();
  }
}
