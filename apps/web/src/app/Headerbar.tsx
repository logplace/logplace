"use client";
import { Avatar, Text, Spinner, Popover } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { LogoutButton } from "./LogoutButton";

const excludedPaths: string[] = ["/login"];

export function Headerbar() {
  const pathname = usePathname();
  const { data: profile, isFetching } = trpc.getAtpProfile.useQuery();

  if (excludedPaths.includes(pathname)) {
    return null;
  }

  return (
    <div className="w-full flex h-[64px] absolute top-0 items-center justify-center border-b-[1px] border-gray-3 px-4 md:px-0">
      <div className="w-full md:w-[50%] lg:w-[40%] h-full flex flex-row justify-between items-center p-4">
        <Text weight="medium" size="3">
          Logplace
        </Text>
        {isFetching || !profile ? (
          <Spinner />
        ) : (
          <Popover.Root>
            <Popover.Trigger>
              <Avatar
                radius="full"
                alt="avatar"
                src={profile.avatar}
                fallback={profile.displayName || profile.handle}
                className="cursor-pointer"
              />
            </Popover.Trigger>
            <Popover.Content align="center">
              <div className="flex flex-col gap-y-2">
                <LogoutButton />
              </div>
            </Popover.Content>
          </Popover.Root>
        )}
      </div>
    </div>
  );
}
