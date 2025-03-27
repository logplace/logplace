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
      className="rounded-2"
      color="red"
    >
      Log out
    </Button>
  );
}
