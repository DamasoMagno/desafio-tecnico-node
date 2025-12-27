import z from "zod";

export const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().min(1).max(100).optional(),
});
