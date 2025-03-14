"use client";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@radix-ui/themes";

export function LoginInput(props: { onSettled?: () => void }) {
  const { onSettled } = props;
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        const handle = `${formData.get("handle")}`;
        router.push("/api/oauth/login?handle=" + handle);
        onSettled?.();
      }}
      className="flex flex-row items-center"
    >
      <TextField.Root
        type="text"
        name="handle"
        placeholder="Enter your bluesky handle..."
        className="flex-grow"
      />
      <Button type="submit" className="my-2 ml-2 text-gray-2 flex min-w-fit">
        Sign in
      </Button>
    </form>
  );
}
