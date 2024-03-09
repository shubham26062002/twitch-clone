'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/hooks/use-sidebar'
import { Hint } from '@/components/hint'
import { Skeleton } from '@/components/ui/skeleton'

export const Toggle = () => {
    const { isCollapsed, handleExpand, handleCollapse } = useSidebar()

    const label = isCollapsed ? 'Expand' : 'Collapse'

    return (
        <>

            {!isCollapsed ? (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-semibold text-primary">For You</p>
                    <Hint label={label} side="right" asChild>
                        <Button className="h-auto p-2 ml-auto" variant="ghost" onClick={handleCollapse}>
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            ) : (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button className="h-auto p-2" variant="ghost" onClick={handleExpand}>
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}

        </>
    )
}

export const ToggleSkeleton = () => {
    return (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
            <Skeleton className="h-6 w-[6.25rem]" />
            <Skeleton className="h-6 w-6" />
        </div>
    )
}