// QlikInitializer.tsx
"use client";
import { useEffect } from "react";
import { setDefaultHostConfig } from "@qlik/api/auth";
import { getAccessToken } from "@/features/auth/actions/get-access-token";

export const QlikInitializer = () => {
  useEffect(() => {
    setDefaultHostConfig({
      host: process.env.NEXT_PUBLIC_QLIK_HOST,
      authType: "oauth2",
      clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
      redirectUri: `${process.env.NEXT_PUBLIC_HOST_URL}/oauth-callback`,
      accessTokenStorage: "session",
      autoRedirect: true,
      getAccessToken: () => getAccessToken(),
    });
  }, []);

  return null;
};
