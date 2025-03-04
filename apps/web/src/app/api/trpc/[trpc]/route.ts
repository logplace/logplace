import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createContext } from "@logplace/trpc";
import { isSessionValid, getUserSession } from "@/utils/auth";

const handler = async (req: Request) => {
  const isAuth = await isSessionValid();

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () =>
      await createContext({
        did: isAuth ? (await getUserSession())["did"] : undefined,
      }),
  });
};

export { handler as GET, handler as POST };
