import { TRPCError } from "@trpc/server";

type TRPCErrorOpts = ConstructorParameters<typeof TRPCError>[0];
type TRPCErrorCode = TRPCErrorOpts["code"];
export type ErrorMessageConst = `${TRPCErrorCode}_${string}`;

export const errorMsg: Record<ErrorMessageConst, string> = {
  UNAUTHORIZED_PLEASE_LOGIN_FIRST: "Please login first",
  UNAUTHORIZED_SESSION_RESTORE_ERROR: "session restore error",
};
