'use client'

import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'

interface ContainerProps {
    children: React.ReactNode,
}

export const Container = ({
    children,
}: ContainerProps) => {
    const { isCollapsed, handleExpand, handleCollapse } = useSidebar()

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
