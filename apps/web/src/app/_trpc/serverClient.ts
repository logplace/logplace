import { createCallerFactory, appRouter, createContext } from "@logplace/trpc";

const createCaller = createCallerFactory(appRouter);
export const serverClient = createCaller(async () => await createContext());
