import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Agent } from "@logplace/atproto";
import { errorMsg } from "../constant";

export const authedProcedure = publicProcedure.use(async (opts) => {
  const { did, oauthClient } = opts.ctx;

  if (!did) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMsg.UNAUTHORIZED_PLEASE_LOGIN_FIRST,
    });
  }
  try {
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
  } catch (e) {
    console.error(e);
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMsg.UNAUTHORIZED_SESSION_RESTORE_ERROR,
    });
  }
});
