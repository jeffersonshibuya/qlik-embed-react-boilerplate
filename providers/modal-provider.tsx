"use client";

import { AppInfoModal } from "@/features/qlik-app-info/components/app-info-modal";
import { AppsListModal } from "@/features/qlik-app-info/components/apps-list-modal";
import { useMountedState } from "react-use";

export const ModalProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <AppInfoModal />
      <AppsListModal />
    </>
  );
};
