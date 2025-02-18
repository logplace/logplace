import { initTRPC } from "@trpc/server";
import { db, dbSchema } from "@logplace/db";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { AtprotoOAuthClient, createClient } from "@logplace/atproto";

export type Context = {
  db: typeof db;
  dbSchema: typeof dbSchema;
  oauthClient: AtprotoOAuthClient;
};

export const createContext = async (
  opts?: CreateNextContextOptions
): Promise<Context> => {
  const oauthClient = await createClient();
  return {
    db,
    dbSchema,
    oauthClient,
  };
};

const trpc = initTRPC.context<Context>().create();
export const {
  router,
  procedure: publicProcedure,
  createCallerFactory,
  mergeRouters,
} = trpc;
