import { initTRPC } from "@trpc/server";
import { db, dbSchema } from "@logplace/db";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export type Context = {
  db: typeof db;
  dbSchema: typeof dbSchema;
};

export const createContext = async (
  opts?: CreateNextContextOptions
): Promise<Context> => {
  return {
    db,
    dbSchema,
  };
};

const trpc = initTRPC.context<Context>().create();
export const {
  router,
  procedure: publicProcedure,
  createCallerFactory,
  mergeRouters,
} = trpc;
