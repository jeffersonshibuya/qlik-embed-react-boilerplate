/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAccessToken } from "@/features/auth/actions/get-access-token";
import { useQlikStore } from "@/hooks/qlik-store";
import { useEffect, useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { setQDoc } = useQlikStore();
  const [QlikProvider, setQlikProvider] =
    useState<null | React.ComponentType<any>>(null);

  useEffect(() => {
    // Dynamically import to avoid SSR issues
    import("@qlik/embed-react").then((mod) => {
      setQlikProvider(() => mod.QlikEmbedConfig.Provider);
    });

    import("@qlik/api/qix").then(async (mod) => {
      const session = mod.openAppSession({
        appId: "5a004e8c-8e42-473a-a4be-9688b5618f52",
      });
      const doc = await session.getDoc();
      setQDoc(doc);
    });
  }, [setQDoc]);

  if (!QlikProvider) return null; // or show a loading spinner

  if (typeof window === "undefined") return null; // Prevent SSR

  return (
    <>
      <QlikProvider
        value={{
          host: "ipc-lab.us.qlikcloud.com",
          clientId: "9c2a96304bbe222ca1cbc1daa1ef3bf8",
          redirectUri: "http://localhost:3000/oauth-callback",
          authType: "oauth2",
          accessTokenStorage: "session",
          autoRedirect: true,
          getAccessToken: () => getAccessToken(),
        }}
      >
        {children}
      </QlikProvider>
    </>
  );
};
