import { NextRequest } from "next/server";
import { serverClient } from "@/app/_trpc/serverClient";
import { redirect } from "next/navigation";
import { getUserSession } from "@/utils/auth";

export async function GET(req: NextRequest) {
  const param = req.nextUrl.searchParams;
  const did = await serverClient.callback({ paramString: param.toString() });
  const clientSession = await getUserSession();
  clientSession.did = did;
  await clientSession.save();
  redirect(`/?did=${did}`);
}
