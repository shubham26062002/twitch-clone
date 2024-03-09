'use client'

import { cn } from '@/lib/utils'
import { useDashboardSidebar } from '@/hooks/use-dashboard-sidebar'

interface WrapperProps {
    children: React.ReactNode,
}

export const Wrapper = ({
    children,
}: WrapperProps) => {
    const { isCollapsed } = useDashboardSidebar()

    return (
        <aside className={cn('fixed left-0 flex flex-col w-[4.375rem] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50', isCollapsed && 'lg:w-[4.375rem]')}>{children}</aside>
    )
}
