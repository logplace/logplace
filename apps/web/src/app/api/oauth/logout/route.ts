import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { serverClient } from "@/app/_trpc/serverClient";

export async function GET() {
  await serverClient.logout();
  const clientSession = await getUserSession();
  clientSession.destroy();
  redirect("/");
}
