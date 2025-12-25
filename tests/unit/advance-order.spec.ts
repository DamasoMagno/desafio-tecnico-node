import { describe, it, expect, vi } from "vitest";
import { AdvanceOrderService } from "@/core/services/advance-order-service";

describe("Advance Order Service", () => {
  it("should advance the order state", async () => {
    const orderRepository = {
      findById: vi.fn().mockResolvedValue({
        id: "order-id",
        state: "CREATED",
        save: vi.fn().mockResolvedValue(true),
      }),
    } as any;

    const advanceOrderService = new AdvanceOrderService(orderRepository);

    await advanceOrderService.execute({ orderId: "order-id" });

    expect(orderRepository.findById).toHaveBeenCalledWith("order-id");
  });

  it("should throw an error if the order is not found", async () => {
    const orderRepository = {
      findById: vi.fn().mockResolvedValue(null),
    } as any;

    const advanceOrderService = new AdvanceOrderService(orderRepository);

    await expect(
      advanceOrderService.execute({ orderId: "non-existent-id" })
    ).rejects.toThrow("Order not found");
  });
});
