"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete("ipc_inTake_access_token");
  redirect("/login");
}
