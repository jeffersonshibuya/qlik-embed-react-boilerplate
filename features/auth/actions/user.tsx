"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserInfo = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("ipc_inTake_access_token")?.value;

  if (!token) redirect("/login");

  const userResponse = await fetch(
    `${process.env.QLIK_SERVER}/api/v1/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!userResponse.ok) redirect("/login");

  const userJson = await userResponse.json();

  return {
    name: userJson.name,
    email: userJson.email,
  };
};

export const logoutUser = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("ipc_inTake_access_token");

  redirect("/login");
};
