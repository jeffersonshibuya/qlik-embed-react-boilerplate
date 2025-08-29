import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tasks } from "@/db/schema";

export const insertTasksSchema = createInsertSchema(tasks)
  .omit({
    id: true,
    createAt: true,
  })
  .extend({
    name: z.string().min(1, "Task name is required"),
  });

export const responseTasksSchema = createSelectSchema(tasks);

export type InsertTaskValues = z.infer<typeof insertTasksSchema>;
export type ResponseTaskValues = z.infer<typeof responseTasksSchema>;
