'use client'

import { useMediaQuery } from 'usehooks-ts'
import { useConnectionState, useRemoteParticipant, useChat } from '@livekit/components-react'
import { ConnectionState } from 'livekit-client'
import { useEffect, useMemo, useState } from 'react'

import { ChatVariant, useChatSidebar } from '@/hooks/use-chat-sidebar'
import { ChatHeader, ChatHeaderSkeleton } from '@/components/stream-player/chat-header'
import { ChatForm, ChatFormSkeleton } from '@/components/stream-player/chat-form'
import { ChatList, ChatListSkeleton } from '@/components/stream-player/chat-list'
import { ChatCommunity } from '@/components/stream-player/chat-community'

interface ChatProps {
    viewerName: string,
    hostName: string,
    hostIdentity: string,
    isFollowing: boolean,
    isChatEnabled: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
}

export const Chat = ({
    viewerName,
    hostName,
    hostIdentity,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
}: ChatProps) => {
    const matches = useMediaQuery('(max-width: 1024px)')

    const { variant, handleExpand } = useChatSidebar()

    const connectionState = useConnectionState()

    const participant = useRemoteParticipant(hostIdentity)

    const isOnline = participant && connectionState === ConnectionState.Connected

    const isHidden = !isChatEnabled || !isOnline

    const [message, setMessage] = useState('')

    const { chatMessages: messages, send } = useChat()

    useEffect(() => {
        if (matches) {
            handleExpand()
        }
    }, [matches, handleExpand])

    const reversedMessages = useMemo(() => [...messages].reverse(), [messages])

    const handleSubmit = () => {
        if (!send) {
            return
        }

        send(message)

        setMessage('')
    }

    const handleChange = (messageValue: string) => {
        setMessage(messageValue)
    }

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-5rem)]">
            <ChatHeader />

            {variant === ChatVariant.CHAT ? (
                <>
                    <ChatList messages={reversedMessages} isHidden={isHidden} />
                    <ChatForm
                        handleSubmit={handleSubmit}
                        message={message}
                        handleChange={handleChange}
                        isHidden={isHidden}
                        isChatFollowersOnly={isChatFollowersOnly}
                        isChatDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            ) : (
                <>
                    <ChatCommunity viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
                </>
            )}
        </div>
    )
}

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-5rem)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    )
}