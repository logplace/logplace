import { LoginInput } from "@/app/LoginInput";

export default async function LoginPage() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col justify-center lg:w-[30%] p-8 gap-y-2">
        Not logged in
        <LoginInput />
      </div>
    </div>
  );
}
