import { z } from "zod";

export const guestBookRecordSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type GuestBookRecord = z.infer<typeof guestBookRecordSchema>;
