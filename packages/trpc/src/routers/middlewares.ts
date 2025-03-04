import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Agent } from "@logplace/atproto";

export const authedProcedure = publicProcedure.use(async (opts) => {
  const { did, oauthClient } = opts.ctx;

  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Please login first",
    });
  }
  const ses = await oauthClient.restore(did);
  const agent = new Agent(ses);
  return opts.next({
    ctx: {
      ...opts.ctx,
      did: did,
      atpAgent: agent,
      atpSession: ses,
    },
  });
});
