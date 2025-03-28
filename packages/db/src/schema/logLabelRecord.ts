import * as t from "drizzle-orm/pg-core";
import { log } from "./log";
import { label } from "./label";

export const logLabelRecord = t.pgTable("log_label_record", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  logId: t.varchar().references(() => log.id),
  labelId: t.uuid().references(() => label.id),
});
