import { guestBookRecordSchema } from "../models";
import { router, publicProcedure } from "../trpc";
import { db, dbSchema } from "@logplace/db";
import { z } from "zod";

export const guestbookRouter = router({
  getGuestRecords: publicProcedure
    .output(z.object({ guests: guestBookRecordSchema.array() }))
    .query(async () => {
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
      await db.insert(dbSchema.guestbook).values({
        name: name,
      });
    }),
});
