"use server";

import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { desc } from "drizzle-orm";

export const getTasks = async () => {
  const response = await db
    .select()
    .from(tasks)
    .orderBy(desc(tasks.completedAt), desc(tasks.updatedAt));
  return response;
};
