'use client'

import { useState, useEffect } from 'react'
import { useIsClient } from 'usehooks-ts'

import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { ToggleSkeleton } from './toggle'
import { RecommendedSkeleton } from './recommended'
import { FollowingSkeleton } from './following'

interface WrapperProps {
    children: React.ReactNode,
}

export const Wrapper = ({
    children,
}: WrapperProps) => {
    const { isCollapsed } = useSidebar()

    const isClient = useIsClient()

    if (!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col w-[4.375rem] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
                <ToggleSkeleton />
                <FollowingSkeleton />
                <RecommendedSkeleton />
            </aside>
        )
    }

    return (
        <aside className={cn('fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50', isCollapsed && 'w-[4.375rem]')}>{children}</aside>
    )
}
