/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAccessToken } from "@/features/auth/actions/get-access-token";
import { useQlikStore } from "@/hooks/qlik-store";
import { useAppStore } from "@/hooks/use-app";
import { useEffect, useState } from "react";

interface WrapperProps {
  children: React.ReactNode;
}

// type eventType = {
//   eventType: "suspended";
//   appId: "5a004e8c-8e42-473a-a4be-9688b5618f52";
//   initiator: "network";
//   code: 4004;
//   reason: "";
// };

export const Wrapper = ({ children }: WrapperProps) => {
  const { setQDoc } = useQlikStore();
  const setAppInfo = useAppStore((s) => s.setAppInfo);
  const [QlikProvider, setQlikProvider] =
    useState<null | React.ComponentType<any>>(null);

  useEffect(() => {
    let session: any;

    const initSession = async () => {
      const { openAppSession } = await import("@qlik/api/qix");

      // Initialize new session
      session = openAppSession({
        appId: "5a004e8c-8e42-473a-a4be-9688b5618f52",
      });

      // Attach websocket events
      session.onWebSocketEvent(async (event: any) => {
        if (event.eventType === "suspended") {
          console.warn("Session suspended. Attempting resume...");
          try {
            await session.resume();
          } catch {
            console.warn("Resume failed, re-initializing session...");
            await initSession();
          }
        } else if (event.eventType === "closed") {
          console.warn("Session closed. Re-initializing...");
          await initSession();
        }
      });

      // Load doc + properties
      const doc = await session.getDoc();
      const appProps = await doc.getAppProperties();

      setQDoc(doc);
      setAppInfo(
        "5a004e8c-8e42-473a-a4be-9688b5618f52",
        appProps.qTitle || "Default App"
      );
    };

    // Import QlikEmbedConfig.Provider (avoid SSR issues)
    import("@qlik/embed-react").then((mod) => {
      setQlikProvider(() => mod.QlikEmbedConfig.Provider);
    });

    initSession();

    // Cleanup on unmount
    return () => {
      if (session) {
        session.close();
      }
    };
  }, [setAppInfo, setQDoc]);

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
