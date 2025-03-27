import { serverClient } from "@/app/_trpc/serverClient";
import { withAuthRequired } from "@/utils/withAuthRequired";

async function Home() {
  const profile = await serverClient.getAtpProfile();

  return (
    <div className="flex flex-row w-full gap-8">
      {`What's up! ${profile.displayName}(${profile.handle})`}
    </div>
  );
}

export default async function HomePage() {
  const Page = await withAuthRequired(Home);
  return <Page />;
}
