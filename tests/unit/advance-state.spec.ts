import { describe, it, expect } from "vitest";

import { AdvanceOrderService } from "@/core/services/advance-order-service";
import { EntityError } from "@/core/errors/entity-error";

describe("advanceState", () => {
  it("should advance from CREATED to ANALYSIS", () => {
    const next = AdvanceOrderService.advanceState("CREATED");
    expect(next).toBe("ANALYSIS");
  });

  it("should advance from ANALYSIS to COMPLETED", () => {
    const next = AdvanceOrderService.advanceState("ANALYSIS");
    expect(next).toBe("COMPLETED");
  });

  it("should throw when trying to advance from COMPLETED", () => {
    expect(() => AdvanceOrderService.advanceState("COMPLETED")).toThrow(
      EntityError
    );
    expect(() => AdvanceOrderService.advanceState("COMPLETED")).toThrow(
      "Cannot advance state."
    );
  });
});
