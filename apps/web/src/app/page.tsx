import { isSessionValid } from "@/utils/auth";
import { LogoutButton } from "./LogoutButton";
import { serverClient } from "@/app/_trpc/serverClient";
import { redirect } from "next/navigation";

const getAtpProfile = async () => {
  const isAuth = await isSessionValid();
  if (!isAuth) {
    return null;
  }
  return await serverClient.getAtpProfile();
};

export default async function Home() {
  const isAuth = await isSessionValid();
  const profile = await getAtpProfile();

  if (!isAuth) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-row items-center p-8 sm:p-20 gap-8 lg:w-[40%]">
        {`What's up! ${profile?.displayName}(${profile?.handle})`}
        <LogoutButton />
      </div>
    </div>
  );
}
