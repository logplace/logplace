import { router } from "../trpc";
import { z } from "zod";
import { authedProcedure } from "./middlewares";
import { labelSchema } from "../data-model";
import { drizzleOrm } from "@logplace/db";

export const labelRouter = router({
  getLabels: authedProcedure
    .output(z.array(labelSchema))
    .query(async (opts) => {
      const { ctx } = opts;
      const { did, db, dbTables } = ctx;
      const labels = await db
        .select()
        .from(dbTables.label)
        .where(drizzleOrm.eq(dbTables.label.id, did));
      return z.array(labelSchema).parse(labels);
    }),
});
