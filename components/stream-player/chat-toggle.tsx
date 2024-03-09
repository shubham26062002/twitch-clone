'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { useChatSidebar } from '@/hooks/use-chat-sidebar'

export const ChatToggle = () => {
    const { isCollapsed, handleExpand, handleCollapse } = useChatSidebar()

    const icon = isCollapsed ? <ArrowLeftFromLine className="h-4 w-4" /> : <ArrowRightFromLine className="h-4 w-4" />

    const handleToggle = () => {
        if (isCollapsed) {
            handleExpand()
        } else {
            handleCollapse()
        }
    }

    const label = isCollapsed ? 'Expand' : 'Collapse'

    return (
        <Hint label={label} side="left" asChild>
            <Button className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent" onClick={handleToggle} variant="ghost">
                {icon}
            </Button>
        </Hint>
    )
}
