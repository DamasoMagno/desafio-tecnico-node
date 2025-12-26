import { EntityError } from "@/core/errors/entity-error";

type OrderState = "CREATED" | "ANALYSIS" | "COMPLETED";

export function advanceState(state: OrderState): OrderState {
  const orderState = ["CREATED", "ANALYSIS", "COMPLETED"] as const;
  const currentState = orderState.indexOf(state);

  if (currentState === -1 || currentState === orderState.length - 1) {
    throw new EntityError("Cannot advance state.");
  }

  return orderState[currentState + 1];
}
