import { create } from "zustand";

type QlikAppInfoState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenAppInfo = create<QlikAppInfoState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
