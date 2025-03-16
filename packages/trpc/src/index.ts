import { mergeRouters } from "./trpc";
import { guestbookRouter } from "./routers/guestbookRouter";
import { oauthRouter } from "./routers/oauthRouter";

export const appRouter = mergeRouters(guestbookRouter, oauthRouter);
export type AppRouter = typeof appRouter;

export * from "./trpc";
export * from "./models";
export * from "./constant";
