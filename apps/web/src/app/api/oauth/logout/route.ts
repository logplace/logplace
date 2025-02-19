import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export async function GET() {
  const clientSession = await getUserSession();
  clientSession.destroy();
  redirect("/");
}
