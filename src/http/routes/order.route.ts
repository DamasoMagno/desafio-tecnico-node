import { Router } from "express";
const orderRoutes = Router();

import { authMiddleware } from "../middleware/auth";

import { OrderController } from "../controllers/order";
const orderController = new OrderController();

orderRoutes.post(
  "/orders",
  authMiddleware,
  orderController.createOrder.bind(orderController)
);

orderRoutes.patch(
  "/orders/:id/comments",
  authMiddleware,
  orderController.createComment.bind(orderController)
);

orderRoutes.get(
  "/orders/deleted",
  authMiddleware,
  orderController.listDeletedOrders.bind(orderController)
);

orderRoutes.get(
  "/orders/:id",
  authMiddleware,
  orderController.getOrder.bind(orderController)
);

orderRoutes.get(
  "/orders",
  authMiddleware,
  orderController.listOrders.bind(orderController)
);

orderRoutes.patch(
  "/orders/:id/advance",
  authMiddleware,
  orderController.advanceOrder.bind(orderController)
);

orderRoutes.patch(
  "/orders/:id/update-services",
  authMiddleware,
  orderController.updateServices.bind(orderController)
);

orderRoutes.delete(
  "/orders/:id",
  authMiddleware,
  orderController.deleteOrder.bind(orderController)
);

export { orderRoutes };
