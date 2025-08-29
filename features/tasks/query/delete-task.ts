"use server";

import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteTask = async (taskId: string) => {
  await db.delete(tasks).where(eq(tasks.id, taskId));
};
