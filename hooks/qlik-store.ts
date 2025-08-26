/* eslint-disable @typescript-eslint/no-explicit-any */
import { openAppSession } from "@qlik/api/qix";
import { create } from "zustand";

interface QlikState {
  qDoc: any | null;
  setQDoc: (doc: any) => void;
  reconnect: () => Promise<void>;
}

export const useQlikStore = create<QlikState>((set) => ({
  qDoc: null,
  setQDoc: (doc) => set({ qDoc: doc }),
  reconnect: async () => {
    // 1. Clear the old session
    set({ qDoc: null });

    try {
      // 2. Open a new session (reinitialize qDoc)
      const session = openAppSession({
        appId: "5a004e8c-8e42-473a-a4be-9688b5618f52",
      });
      await session.getDoc();
      // set({ qDoc: doc });
      console.log("Qlik session re-established");
    } catch (err) {
      console.error("Failed to reconnect Qlik session", err);
    }
  },
}));
