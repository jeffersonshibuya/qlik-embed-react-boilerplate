/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";

interface QlikState {
  appId: string | null;
  setAppId: (doc: any) => void;
}

export const useAppStore = create<QlikState>((set) => ({
  appId: null,
  setAppId: (appId: string) => set({ appId: appId }),
}));
