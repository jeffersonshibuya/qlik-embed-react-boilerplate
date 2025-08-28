import { create } from "zustand";

interface QlikState {
  appId: string | null;
  appName: string | null;
  setAppInfo: (appId: string, appName: string) => void;
}

export const useAppStore = create<QlikState>((set) => ({
  appId: null,
  appName: null,
  setAppInfo: (appId: string, appName: string) => set({ appId, appName }),
}));
