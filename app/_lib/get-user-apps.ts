"use server";

import { getAccessToken } from "@/features/auth/actions/get-access-token";

export type QLikAppsResponseAttributes = {
  id: string;
  name: string;
  description: string;
  owner: string;
  createdDate: string;
  lastReloadTime: string;
  modifiedDate: string;
  usage: string;
};

export type QlikAppsResponse = {
  data: {
    attributes: QLikAppsResponseAttributes;
  }[];
};

export async function getUserApps(): Promise<QLikAppsResponseAttributes[]> {
  const token = await getAccessToken();

  const response = await fetch(`${process.env.QLIK_SERVER}/api/v1/apps`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const apps: QlikAppsResponse = await response.json();
  const data = apps.data.map((app) => app.attributes);
  return data;
}
