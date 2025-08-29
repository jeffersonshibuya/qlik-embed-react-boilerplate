"use server";

import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export const uncheckTask = async (taskId: string) => {
  await db
    .update(tasks)
    .set({
      completedAt: null,
    })
    .where(eq(tasks.id, taskId));
};
