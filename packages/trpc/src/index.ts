import { mergeRouters } from "./trpc";
import { oauthRouter } from "./routers/oauthRouter";

export const appRouter = mergeRouters(oauthRouter);
export type AppRouter = typeof appRouter;

export * from "./trpc";
export * from "./constant";
export * from "./data-model";
