import { NextRequest } from "next/server";
import { serverClient } from "@/app/_trpc/serverClient";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const handle = searchParams.get("handle");

  if (!handle) {
    return new Response("Missing handle", { status: 400 });
  }
  const redirectUrl = await serverClient.login({ handle });
  redirect(redirectUrl);
}
