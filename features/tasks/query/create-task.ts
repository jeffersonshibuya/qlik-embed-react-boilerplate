"use server";

import { db } from "@/db/drizzle";
import { InsertTaskValues } from "../types";
import { tasks } from "@/db/schema";

export const createTask = async (values: InsertTaskValues) => {
  await db.insert(tasks).values(values);
};
