import { z } from "zod";

export const labelSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const logSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  labels: z.array(labelSchema),
});
