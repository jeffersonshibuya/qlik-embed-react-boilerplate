"use server";

import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const checkTask = async (taskId: string) => {
  await db
    .update(tasks)
    .set({
      completedAt: new Date().toISOString(),
    })
    .where(eq(tasks.id, taskId));
};
