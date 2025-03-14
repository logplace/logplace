import { isSessionValid } from "@/utils/auth";
import { LogoutButton } from "./LogoutButton";
import { LoginInput } from "./LoginInput";
import { serverClient } from "@/app/_trpc/serverClient";

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
    return (
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center lg:w-[30%] p-8 gap-y-2">
          Not logged in
          <LoginInput />
        </div>
      </div>
    );
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
