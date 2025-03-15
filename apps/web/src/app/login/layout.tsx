import { redirect } from "next/navigation";
import { isSessionValid } from "@/utils/auth";

export default async function LoginPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // page protection, if logged in already, redirect to home
  const isAuth = await isSessionValid();
  if (isAuth) {
    redirect("/");
  }
  return children;
}
