'use client'

import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import { useDashboardSidebar } from '@/hooks/use-dashboard-sidebar'

interface WrapperProps {
    children: React.ReactNode,
}

export const Container = ({
    children,
}: WrapperProps) => {
    const { isCollapsed, handleCollapse, handleExpand } = useDashboardSidebar()

    const matches = useMediaQuery('(max-width: 1024px)')

    useEffect(() => {
        if (matches) {
            handleCollapse()
        } else {
            handleExpand()
        }
    }, [matches, handleCollapse, handleExpand])

    return (
        <div className={cn('flex-1', isCollapsed ? 'ml-[4.375rem]' : 'ml-[4.375rem] lg:ml-60')}>{children}</div>
    )
}
