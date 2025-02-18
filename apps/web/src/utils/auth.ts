import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { serverEnv } from "@/serverEnv";

export type UserSession = {
  did: string;
};

/*
 * Get User Session at server side
 */
export async function getUserSession() {
  const cookieStore = await cookies();
  const clientSession = await getIronSession<UserSession>(cookieStore, {
    password: serverEnv.COOKIE_SECRET,
    cookieName: "sid",
  });
  return clientSession;
}
