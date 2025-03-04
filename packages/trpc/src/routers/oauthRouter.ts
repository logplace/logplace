import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { isValidHandle, OAuthResolverError, Agent } from "@logplace/atproto";
import { TRPCError } from "@trpc/server";
import { authedProcedure } from "./middlewares";

export const oauthRouter = router({
  login: publicProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { oauthClient } = opts.ctx;
      const { handle } = opts.input;

      if (!isValidHandle(handle)) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid handle",
        });
      }
      try {
        const url = await oauthClient.authorize(handle, {
          scope: "atproto transition:generic",
        });
        return url.toString();
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            e instanceof OAuthResolverError
              ? e.message
              : "couldn't initiate login",
        });
      }
    }),
  callback: publicProcedure
    .input(
      z.object({
        paramString: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { oauthClient } = opts.ctx;
      const { paramString } = opts.input;
      const params = new URLSearchParams(paramString);
      const { session } = await oauthClient.callback(params);
      const did = session.did;

      // testing
      try {
        const ses = await oauthClient.restore(did);
        const agent = new Agent(ses);
        const foo = await agent.getProfile({
          actor: did,
        });
        console.log("AGENT INIT SUCCESSFULLY: ", foo);
      } catch (e) {
        console.log("ERROR INIT AGENT", e);
      }
      return did;
    }),
  logout: authedProcedure.mutation(async (opts) => {
    const { atpSession } = opts.ctx;
    await atpSession.signOut();
  }),
  getAtpProfile: authedProcedure.query(async (opts) => {
    const { atpAgent, did } = opts.ctx;
    const profile = await atpAgent.getProfile({
      actor: did,
    });
    console.log("PROFILE: ", profile);
    return profile.data;
  }),
});
