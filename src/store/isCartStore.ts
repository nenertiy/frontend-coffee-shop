import { create } from "zustand";

interface IsCartStore {
  isCart: boolean;
  updateIsCart: () => void;
}

export const useIsCartStore = create<IsCartStore>()((set) => ({
  isCart: true,
  updateIsCart: () => set((state) => ({ isCart: !state.isCart })),
}));
