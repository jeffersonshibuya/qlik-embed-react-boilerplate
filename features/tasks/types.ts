import z from "zod";
import { createInsertSchema } from "drizzle-zod";
import { tasks } from "@/db/schema";

export const insertScheduledSchema = createInsertSchema(tasks)
  .omit({
    id: true,
    createAt: true,
  })
  .extend({
    name: z.string().min(1, "Task name is required"),
  });

export type InsertTaskValues = z.infer<typeof insertScheduledSchema>;
