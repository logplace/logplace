"use client";

import { sign } from "./signGuestname";

export function GuestbookInput() {
  return (
    <form
      action={(formData) => {
        const name = `${formData.get("guestname")}`;
        sign(name);
      }}
      className="bg-black"
    >
      <input
        type="text"
        name="guestname"
        placeholder="Enter your name..."
        className="px-4 py-2 border rounded-lg bg-black"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Sign
      </button>
    </form>
  );
}
