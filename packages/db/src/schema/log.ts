import * as t from "drizzle-orm/pg-core";

export const log = t.pgTable("log", {
  id: t.varchar().primaryKey(),
  userId: t.varchar().notNull(),
  title: t.varchar({ length: 64 }).notNull(),
  description: t.varchar(),
  createdAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  deletedAt: t.timestamp({ mode: "string", withTimezone: true }),
});
