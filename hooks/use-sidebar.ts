import { create } from 'zustand'

interface SidebarStore {
    isCollapsed: boolean,
    handleExpand: () => void,
    handleCollapse: () => void,
}

export const useSidebar = create<SidebarStore>((set) => ({
    isCollapsed: false,
    handleExpand: () => set(() => ({ isCollapsed: false })),
    handleCollapse: () => set(() => ({ isCollapsed: true })),
}))