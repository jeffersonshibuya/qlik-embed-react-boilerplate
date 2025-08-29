"use client";

import { AppInfoModal } from "@/features/qlik-app-info/components/app-info-modal";
import { AppsListModal } from "@/features/qlik-app-info/components/apps-list-modal";
import { UserInfoModal } from "@/features/user/components/user-info-modal";
import { useMountedState } from "react-use";

export const ModalProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      {/* App */}
      <AppInfoModal />
      <AppsListModal />

      {/* User */}
      <UserInfoModal />
    </>
  );
};
