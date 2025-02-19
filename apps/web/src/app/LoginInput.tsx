"use client";
import { useRouter } from "next/navigation";

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
      className="flex flex-row"
    >
      <input
        type="text"
        name="handle"
        placeholder="Enter your bluesky handle..."
        className="flex px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 w-full"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-gray-700 text-white rounded-lg flex min-w-fit"
      >
        Sign In
      </button>
    </form>
  );
}
