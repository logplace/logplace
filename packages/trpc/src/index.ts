import { mergeRouters } from "./trpc";
import { guestbookRouter } from "./routers/guestbookRouter";
export * from "./models";

export const appRouter = mergeRouters(guestbookRouter);

export type AppRouter = typeof appRouter;
export * from "./trpc";
