import { date, pgTable, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const tasks = pgTable("tasks", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  completedAt: date("completed_at"),
  createAt: date("created_at").defaultNow(),
});
