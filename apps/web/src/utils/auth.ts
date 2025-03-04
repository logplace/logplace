import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getServerEnv } from "@/serverEnv";

export type UserSession = {
  did: string;
};

/*
 * Get User Session at server side
 * Note that, according to https://github.com/vvo/iron-session/blob/15310eb074b931c830ac3a133cb0f23eab42c144/src/core.ts#L260
 * If session expired, it will start a new session, therefore, this function will always return a session,
 * to check if the session is valid or not, check whether it's empty or not.
 * Please use isSessionValid to check if the session is valid or not.
 */
export async function getUserSession() {
  const cookieStore = await cookies();
  const clientSession = await getIronSession<UserSession>(cookieStore, {
    password: getServerEnv().COOKIE_SECRET,
    cookieName: "sid",
  });
  return clientSession;
}

export async function isSessionValid() {
  const session = await getUserSession();
  return session["did"] !== undefined;
}
