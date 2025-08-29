"use server";

import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";

export const getTasks = async () => {
  const response = await db.select().from(tasks).orderBy(tasks.name);
  return response;
};
