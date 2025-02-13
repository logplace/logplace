"use server";

import { db, dbSchema } from "@logplace/db";
import { revalidatePath } from "next/cache";

export async function sign(name: string) {
  await db.insert(dbSchema.guestbook).values({
    name: name,
  });
  revalidatePath("/");
}
