"use server";

import { getAccessToken } from "@/features/auth/actions/get-access-token";

export type UserResponseType = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  lastUpdated: string;
  roles: string[];
  assignedGroups: {
    id: string;
    name: string;
  }[];
};

export async function getUserInfo(): Promise<UserResponseType> {
  const token = await getAccessToken();

  const response = await fetch(`${process.env.QLIK_SERVER}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const result: UserResponseType = await response.json();
    return result;
  }
  throw new Error("Error on fetch user");
}
