/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccessToken } from "@/features/auth/actions/get-access-token";

// export type QLikAppsResponseAttributes = {
//   id: string;
//   name: string;
//   description: string;
//   owner: string;
//   createdDate: string;
//   lastReloadTime: string;
//   modifiedDate: string;
//   usage: string;
// };

// export type QlikAppsResponse = {
//   data: {
//     attributes: QLikAppsResponseAttributes;
//   }[];
// };

export async function getReloads(): Promise<any[]> {
  const token = await getAccessToken();

  // Start reload
  const start = await fetch(
    `${process.env.QLIK_SERVER}/api/v1/reloads?appId=9d443776-50ae-455c-bcd8-dad54dd1ae94`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appId: "9d443776-50ae-455c-bcd8-dad54dd1ae94" }),
    }
  );
  const reload = await start.json();
  console.log(reload);
  return reload;
}

export async function reload(): Promise<any[]> {
  const token = await getAccessToken();

  // Start reload
  const start = await fetch(`${process.env.QLIK_SERVER}/api/v1/reloads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appId: "9d443776-50ae-455c-bcd8-dad54dd1ae94" }),
  });
  const reload = await start.json();
  console.log(reload);
  return reload;
}
