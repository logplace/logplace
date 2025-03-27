import { serverClient } from "@/app/_trpc/serverClient";
import { withAuthRequired } from "@/utils/withAuthRequired";
import { Text } from "@radix-ui/themes";
import { LogCreateDialog } from "./LogCreateDialog";

async function Home() {
  const profile = await serverClient.getAtpProfile();

  return (
    <div className="flex flex-col w-full gap-y-4">
      <Text className="">{`What's up, ${profile.displayName || profile.handle}! `}</Text>
      <LogCreateDialog />
    </div>
  );
}

export default async function HomePage() {
  const Page = await withAuthRequired(Home);
  return <Page />;
}
