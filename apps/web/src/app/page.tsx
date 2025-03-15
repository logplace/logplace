import { LogoutButton } from "./LogoutButton";
import { serverClient } from "@/app/_trpc/serverClient";
import { withAuthRequired } from "@/utils/withAuthRequired";

async function Home() {
  const profile = await serverClient.getAtpProfile();

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-row items-center p-8 sm:p-20 gap-8 lg:w-[40%]">
        {`What's up! ${profile.displayName}(${profile.handle})`}
        <LogoutButton />
      </div>
    </div>
  );
}

export default async function HomePage() {
  const Page = await withAuthRequired(Home);
  return <Page />;
}
