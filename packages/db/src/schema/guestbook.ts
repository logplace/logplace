import * as t from "drizzle-orm/pg-core";

export const guestbook = t.pgTable("guestbook", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 255 }).notNull(),
});
