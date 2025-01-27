import { db } from "@logplace/db/src/index";
import { schema } from "@logplace/db/src/schema";
import { GuestbookInput } from "./GuestbookInput";

export const dynamic = "force-dynamic";

export default async function Home() {
  const rows = await db.select().from(schema.guestbook);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Hi, this is logplace
      <GuestbookInput />
      <div className="flex-col gap-y-4">
        {rows.map((record) => (
          <div key={record.id} className="font-bold">
            {record.name}
          </div>
        ))}
      </div>
    </div>
  );
}
