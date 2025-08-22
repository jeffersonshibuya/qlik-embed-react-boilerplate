/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface QlikState {
  qDoc: any | null;
  setQDoc: (doc: any) => void;
}

export const useQlikStore = create<QlikState>((set) => ({
  qDoc: null,
  setQDoc: (doc) => set({ qDoc: doc }),
}));
