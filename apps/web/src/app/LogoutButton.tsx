"use client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        // fetch logout endpoint
        await fetch("/api/oauth/logout");
        router.refresh();
      }}
      className="ml-2 px-4 py-2 bg-gray-700 text-white rounded-lg min-w-fit flex"
    >
      Log out
    </button>
  );
}
