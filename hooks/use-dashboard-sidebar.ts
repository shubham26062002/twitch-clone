import { create } from 'zustand'

interface DashboardSidebarStore {
    isCollapsed: boolean,
    handleExpand: () => void,
    handleCollapse: () => void,
}

export const useDashboardSidebar = create<DashboardSidebarStore>((set) => ({
    isCollapsed: false,
    handleExpand: () => set(() => ({ isCollapsed: false })),
    handleCollapse: () => set(() => ({ isCollapsed: true })),
}))