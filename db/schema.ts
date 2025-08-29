import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const tasks = pgTable("tasks", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  completedAt: date("completed_at"),
  createAt: date("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isDelete: boolean("is_deleted").default(false),
});
