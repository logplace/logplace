import * as t from "drizzle-orm/pg-core";
import { log } from "./log";

export const label = t.pgTable("label", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 32 }).notNull(),
  createdBy: t
    .varchar()
    .notNull()
    .references(() => log.id),
  createdAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp({ mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
});
