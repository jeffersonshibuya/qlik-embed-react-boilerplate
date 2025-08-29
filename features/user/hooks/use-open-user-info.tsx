import { create } from "zustand";

type StateProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenUserInfo = create<StateProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
