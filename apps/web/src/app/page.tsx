"use client";
import { GuestbookInput } from "./GuestbookInput";
import { trpc } from "@/app/_trpc/client";

export default function Home() {
  const { data, isFetching } = trpc.getGuestRecords.useQuery();
  return (
    <div className="flex flex-row justify-center text-gray-600">
      <div className="flex flex-col justify-items-center min-h-screen p-8 sm:p-20 gap-8 lg:w-[40%]">
        Hi, this is a guestbook.
        <GuestbookInput />
        {isFetching || !data ? (
          <div>Loading...</div>
        ) : (
          <div className="flex-col gap-y-4">
            {data.guests.map((record) => (
              <div key={record.id} className="font-medium text-gray-700">
                {record.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
