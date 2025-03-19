import { NextRequest } from "next/server";
import { serverClient } from "@/app/_trpc/serverClient";
import { redirect } from "next/navigation";
import { getUserSession } from "@/utils/auth";
import { encodeToastSearchParams } from "@/utils/toast";

export async function GET(req: NextRequest) {
  const param = req.nextUrl.searchParams;

  // handle error
  // currently, just redirect to login with error message
  if (param.get("error") || param.get("error_description")) {
    redirect(`/login?${encodeToastSearchParams("Login error", "error")}`);
  }
  const did = await serverClient.callback({
    paramString: param.toString(),
  });
  const clientSession = await getUserSession();
  clientSession.did = did;
  await clientSession.save();
  redirect(`/`);
}
