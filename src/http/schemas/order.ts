import z from "zod";

export const createOrder = z.object({
  lab: z.string(),
  patient: z.string(),
  customer: z.string(),
  services: z.array(
    z.object({
      name: z.string(),
      value: z.number().min(0),
    })
  ),
});

export const orderIdParam = z.object({
  id: z.string(),
});

export const updateOrder = z.object({
  lab: z.string().optional(),
  patient: z.string().optional(),
  customer: z.string().optional(),
  services: z
    .array(
      z.object({
        name: z.string(),
        value: z.number().min(0),
      })
    )
    .optional(),
});
