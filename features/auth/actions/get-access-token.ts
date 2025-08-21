"use server";

import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ipc_inTake_access_token");
  return accessToken?.value || "";
}
