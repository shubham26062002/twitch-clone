'use client'

import { MessageSquare, Users } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { ChatVariant, useChatSidebar } from '@/hooks/use-chat-sidebar'

export const ChatVariantToggle = () => {
    const { variant, handleVariantChange } = useChatSidebar()

    const isChat = variant === ChatVariant.CHAT

    const icon = isChat ? <Users className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />

    const handleToggle = () => {
        const newChatVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT

        handleVariantChange(newChatVariant)
    }

    const label = isChat ? 'Community' : 'Go to chat'

    return (
        <Hint label={label} side="left" asChild>
            <Button className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent" onClick={handleToggle} variant="ghost">
                {icon}
            </Button>
        </Hint>
    )
}
