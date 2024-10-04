import { create } from "zustand";

interface IsCartStore {
  isCart: boolean;
  updateIsCart: () => void;
}

export const useIsCartStore = create<IsCartStore>()((set) => ({
  isCart: false,
  updateIsCart: () => set((state) => ({ isCart: !state.isCart })),
}));
