import { isSessionValid, getUserSession } from "@/utils/auth";
import { LogoutButton } from "./LogoutButton";
import { LoginInput } from "./LoginInput";

export default async function Home() {
  const isAuth = await isSessionValid();
  const session = await getUserSession();

  if (!isAuth) {
    return (
      <div className="flex flex-row justify-center text-gray-600">
        <div className="flex flex-col justify-center text-gray-600 lg:w-[40%] p-8 gap-y-2">
          Not logged in
          <LoginInput />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-center text-gray-600">
      <div className="flex flex-row items-center p-8 sm:p-20 gap-8 lg:w-[40%]">
        {`What's up! ${session.did}`}
        <LogoutButton />
      </div>
    </div>
  );
}
