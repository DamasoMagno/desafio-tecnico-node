import { describe, it, expect } from "vitest";

import { advanceState } from "@/utils/advance-state";
import { EntityError } from "@/core/errors/entity-error";

describe("advanceState", () => {
  it("should advance from CREATED to ANALYSIS", () => {
    const next = advanceState("CREATED");
    expect(next).toBe("ANALYSIS");
  });

  it("should advance from ANALYSIS to COMPLETED", () => {
    const next = advanceState("ANALYSIS");
    expect(next).toBe("COMPLETED");
  });

  it("should throw when trying to advance from COMPLETED", () => {
    expect(() => advanceState("COMPLETED")).toThrow(EntityError);
    expect(() => advanceState("COMPLETED")).toThrow("Cannot advance state.");
  });
});
