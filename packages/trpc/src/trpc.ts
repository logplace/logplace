import { initTRPC } from "@trpc/server";
import { db, dbTables } from "@logplace/db";
import { AtprotoOAuthClient, createClient } from "@logplace/atproto";

export const createContext = async ({ did }: { did?: string }) => {
  let oauthClient: AtprotoOAuthClient;
  try {
    oauthClient = await createClient();
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create OAuth client");
  }

  return {
    db,
    dbTables,
    oauthClient,
    did,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const trpc = initTRPC.context<Context>().create();
export const {
  router,
  procedure: publicProcedure,
  createCallerFactory,
  mergeRouters,
} = trpc;
