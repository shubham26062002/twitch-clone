'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useDashboardSidebar } from '@/hooks/use-dashboard-sidebar'

export const Toggle = () => {
    const { isCollapsed, handleExpand, handleCollapse } = useDashboardSidebar()

    const label = isCollapsed ? 'Expand' : 'Collapse'

    return (
        <>

            {isCollapsed ? (
                <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button className="h-auto p-2" onClick={handleExpand} variant="ghost">
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            ) : (
                <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
                    <p className="font-semibold text-primary">Dashboard</p>
                    <Hint label={label} side="right" asChild>
                        <Button className="h-auto p-2 ml-auto" variant="ghost" onClick={handleCollapse}>
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}

        </>
    )
}