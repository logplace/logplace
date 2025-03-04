import { createCallerFactory, appRouter, createContext } from "@logplace/trpc";
import { isSessionValid, getUserSession } from "@/utils/auth";

const createCaller = createCallerFactory(appRouter);

export const serverClient = createCaller(async () => {
  const sessionValid = await isSessionValid();
  return await createContext({
    did: sessionValid ? (await getUserSession())["did"] : undefined,
  });
});
