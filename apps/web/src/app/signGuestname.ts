"use server";

import { db } from "@logrider/db/src/index";
import { schema } from "@logrider/db/src/schema";
import { revalidatePath } from "next/cache";

export async function sign(name: string) {
  await db.insert(schema.guestbook).values({
    name: name,
  });
  revalidatePath("/");
}
