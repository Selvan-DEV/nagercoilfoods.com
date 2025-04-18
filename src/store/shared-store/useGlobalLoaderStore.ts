import { create } from "zustand";

interface LoaderState {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useGlobalLoaderStore = create<LoaderState>((set) => ({
  loading: false,
  showLoader: () => set({ loading: true }),
  hideLoader: () => set({ loading: false }),
}));
