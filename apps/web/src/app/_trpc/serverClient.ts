import { createCallerFactory, appRouter } from "@logplace/trpc";

const createCaller = createCallerFactory(appRouter);
export const serverClient = createCaller(() => {});
