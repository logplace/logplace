import { db } from "@logplace/db/src/index";
import { schema } from "@logplace/db/src/schema";
import { GuestbookInput } from "./GuestbookInput";

export const dynamic = "force-dynamic";

export default async function Home() {
  const rows = await db.select().from(schema.guestbook);

  return (
    <div className="flex flex-row justify-center text-gray-600">
      <div className="flex flex-col justify-items-center min-h-screen p-8 sm:p-20 gap-8 lg:w-[40%]">
        Hi, this is logplace
        <GuestbookInput />
        <div className="flex-col gap-y-4">
          {rows.map((record) => (
            <div key={record.id} className="font-medium text-gray-700">
              {record.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
