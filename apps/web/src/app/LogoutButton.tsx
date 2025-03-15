"use client";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

export function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        // fetch logout endpoint
        await fetch("/api/oauth/logout");
        router.refresh();
      }}
      className="ml-2 px-4 py-2 rounded-2 min-w-fit flex"
    >
      Log out
    </Button>
  );
}
