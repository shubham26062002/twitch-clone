import { create } from 'zustand'

export enum ChatVariant {
    CHAT = 'CHAT',
    COMMUNITY = 'COMMUNITY',
}

interface ChatSidebarStore {
    variant: ChatVariant,
    isCollapsed: boolean,
    handleExpand: () => void,
    handleCollapse: () => void,
    handleVariantChange: (variant: ChatVariant) => void,
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
    variant: ChatVariant.CHAT,
    isCollapsed: false,
    handleExpand: () => set(() => ({ isCollapsed: false })),
    handleCollapse: () => set(() => ({ isCollapsed: true })),
    handleVariantChange: (variant: ChatVariant) => set(() => ({ variant })),
}))