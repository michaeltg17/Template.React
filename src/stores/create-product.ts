import { create } from 'zustand';

interface CreateProductStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateProductStore = create<CreateProductStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
