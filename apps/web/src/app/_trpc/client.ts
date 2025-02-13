import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@logplace/trpc";

export const trpc = createTRPCReact<AppRouter>({});
