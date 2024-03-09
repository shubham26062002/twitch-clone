'use client'

import { ReceivedChatMessage } from '@livekit/components-react'

import { ChatMessage } from '@/components/stream-player/chat-message'
import { Skeleton } from '@/components/ui/skeleton'

interface ChatListProps {
    messages: ReceivedChatMessage[],
    isHidden: boolean,
}

export const ChatList = ({
    messages,
    isHidden,
}: ChatListProps) => {
    if (isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">{isHidden ? 'Chat is disabled.' : 'Nothing in chat.'}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col-reverse overflow-y-auto hidden-scrollbar p-3 h-full">

            {messages.map((message, index) => (
                <ChatMessage key={index} data={message} />
            ))}

        </div>
    )
}

export const ChatListSkeleton = () => {
    return (
        <div className="flex h-full justify-center items-center">
            <Skeleton className="w-1/2 h-6" />
        </div>
    )
}
