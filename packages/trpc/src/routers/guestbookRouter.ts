import { guestBookRecordSchema } from "../models";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const guestbookRouter = router({
  getGuestRecords: publicProcedure
    .output(z.object({ guests: guestBookRecordSchema.array() }))
    .query(async (opts) => {
      const ctx = opts.ctx;
      const { db, dbSchema } = ctx;
      const data = await db.select().from(dbSchema.guestbook);
      return {
        guests: data,
      };
    }),
  signName: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { name } = opts.input;
      const { db, dbSchema } = opts.ctx;
      await db.insert(dbSchema.guestbook).values({
        name: name,
      });
    }),
});
