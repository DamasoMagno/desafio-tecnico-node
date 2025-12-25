import { AdvanceOrderService } from "@/core/services/advance-order-service";
import { CreateOrderService } from "@/core/services/create-order-service";
import { DeleteOrderService } from "@/core/services/delete-order-service";
import { GetOrderService } from "@/core/services/get-order-service";
import { GetOrdersService } from "@/core/services/get-orders-service";
import { OrderRepository } from "@/core/repositories/mongoose/Order";

const orderRepository = new OrderRepository();

export function makeCreateOrderService() {
  return new CreateOrderService(orderRepository);
}

export function makeGetOrderService() {
  return new GetOrderService(orderRepository);
}

export function makeAdvanceOrderService() {
  return new AdvanceOrderService(orderRepository);
}

export function makeDeleteOrderService() {
  return new DeleteOrderService(orderRepository);
}

export function makeGetOrdersService() {
  return new GetOrdersService(orderRepository);
}
