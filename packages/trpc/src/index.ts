import { mergeRouters } from "./trpc";
import { oauthRouter } from "./routers/oauthRouter";
import { labelRouter } from "./routers/labelRouter";

export const appRouter = mergeRouters(oauthRouter, labelRouter);
export type AppRouter = typeof appRouter;

export * from "./trpc";
export * from "./constant";
export * from "./data-model";
