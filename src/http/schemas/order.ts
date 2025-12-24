import z from "zod";

export const createOrder = z.object({
  lab: z.string(),
  patient: z.string(),
});
