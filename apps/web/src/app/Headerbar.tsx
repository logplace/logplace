"use client";
import { Avatar, Text } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

const excludedPaths: string[] = ["/login"];

export function Headerbar() {
  const pathname = usePathname();
  const { data: profile, isFetching } = trpc.getAtpProfile.useQuery();

  console.log(profile);
  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="w-full flex h-[64px] absolute top-0 items-center justify-center border-b-[1px] border-gray-3 px-4 md:px-0">
      <div className="w-full md:w-[50%] lg:w-[40%] h-full flex flex-row justify-between items-center p-4">
        <Text weight="medium" size="3">
          Logplace
        </Text>
        {isFetching || !profile ? null : (
          <Avatar
            radius="full"
            alt="avatar"
            src={profile.avatar}
            fallback={profile.displayName || profile.handle}
          />
        )}
      </div>
    </div>
  );
}
