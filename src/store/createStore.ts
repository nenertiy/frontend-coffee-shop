import { create } from "zustand";

interface useCreateStoreProps {
  categoryIsOpen: boolean;
  subcategoryIsOpen: boolean;
  productIsOpen: boolean;
  categoryOpen: () => void;
  subcategoryOpen: () => void;
  productOpen: () => void;
}

export const useCreateStore = create<useCreateStoreProps>()((set) => ({
  categoryIsOpen: false,
  subcategoryIsOpen: false,
  productIsOpen: false,

  categoryOpen: () => set((state) => ({ categoryIsOpen: !state.categoryIsOpen })),
  subcategoryOpen: () => set((state) => ({ subcategoryIsOpen: !state.subcategoryIsOpen })),
  productOpen: () => set((state) => ({ productIsOpen: !state.productIsOpen })),
}));
