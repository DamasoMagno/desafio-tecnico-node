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
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export const updateOrder = z.object({
  lab: z.string().optional(),
  patient: z.string().optional(),
  customer: z.string().optional(),
  services: z
    .array(
      z.object({
        name: z.string(),
        value: z.number().min(0).positive(),
      })
    )
    .optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1),
});

export const updateServicesOrder = z.object({
  services: z.array(
    z.object({
      name: z.string(),
      value: z.number().min(0).positive(),
    })
  ),
});
