"use server";

import { db } from "@capsulr/db/src/index";
import { schema } from "@capsulr/db/src/schema";
import { revalidatePath } from "next/cache";

export async function sign(name: string) {
  await db.insert(schema.guestbook).values({
    name: name,
  });
  revalidatePath("/");
}
