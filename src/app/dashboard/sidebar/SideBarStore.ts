import { create } from 'zustand';

type Store = {
  isSideBarOpen: boolean;
  toggleIsSideBarOpen: () => void;
};

const useSidebarStore = create<Store>()((set) => ({
  isSideBarOpen: false,
  toggleIsSideBarOpen: () =>
    set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
}));

export default useSidebarStore;
