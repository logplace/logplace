"use client";
import { useEffect } from "react";
import { Text } from "@radix-ui/themes";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("??", error);
  }, [error]);

  return (
    <div className="flex flex-row justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center lg:w-[30%] p-8 gap-y-2">
        <Text size="4" weight={"medium"}>
          Something went wrong :(
        </Text>
        <Text size="2" className="text-gray-9">
          {error.message}
        </Text>
      </div>
    </div>
  );
}
