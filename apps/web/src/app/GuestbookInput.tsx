"use client";
import { trpc } from "@/app/_trpc/client";

export function GuestbookInput(props: { onSettled?: () => void }) {
  const { onSettled } = props;
  const sign = trpc.signName.useMutation();

  return (
    <form
      action={async (formData) => {
        const name = `${formData.get("guestname")}`;
        await sign.mutateAsync({ name });
        onSettled?.();
      }}
      className="flex flex-row"
    >
      <input
        type="text"
        name="guestname"
        placeholder="Enter your name..."
        className="flex w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-gray-700 text-white rounded-lg"
      >
        Sign
      </button>
    </form>
  );
}
