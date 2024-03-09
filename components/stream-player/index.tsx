'use client'

import { Stream, User } from '@prisma/client'
import { LiveKitRoom } from '@livekit/components-react'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { Video, VideoSkeleton } from '@/components/stream-player/video'
import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/hooks/use-chat-sidebar'
import { Chat, ChatSkeleton } from '@/components/stream-player/chat'
import { ChatToggle } from '@/components/stream-player/chat-toggle'
import { Header, HeaderSkeleton } from '@/components/stream-player/header'
import { InfoCard } from '@/components/stream-player/info-card'
import { AboutCard } from '@/components/stream-player/about-card'

type CustomStream = {
    id: string,
    name: string,
    isChatEnabled: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
    isLive: boolean,
    thumbnailUrl: string | null,
}

type CustomUser = {
    id: string,
    username: string,
    bio: string | null,
    stream: CustomStream | null,
    imageUrl: string,
    _count: {
        followers: number,
    },
}

interface StreamPlayerProps {
    user: CustomUser,
    stream: CustomStream,
    isFollowing: boolean,
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}: StreamPlayerProps) => {
    const { token, name, identity } = useViewerToken(user.id)

    const { isCollapsed } = useChatSidebar()

    if (!token || !name || !identity) {
        return (
            <StreamPlayerSkeleton />
        )
    }

    return (
        <>

            {isCollapsed && (
                <div className="hidden lg:block fixed top-[6.25rem] right-2 z-50">
                    <ChatToggle />
                </div>
            )}

            <LiveKitRoom className={cn('grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full', isCollapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2')} token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}>
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video hostname={user.username} hostIdentity={user.id} />
                    <Header hostName={user.username} hostIdentity={user.id} viewerIdentity={identity} imageUrl={user.imageUrl} isFollowing={isFollowing} name={stream.name} />
                    <InfoCard hostIdentity={user.id} viewerIdentity={identity} name={stream.name} thumbnailUrl={stream.thumbnailUrl} />
                    <AboutCard hostName={user.username} hostIdentity={user.id} viewerIdentity={identity} bio={user.bio} followedByCount={user._count.followers} />
                </div>
                <div className={cn('col-span-1', isCollapsed && 'hidden')}>
                    <Chat viewerName={name} hostName={user.username} hostIdentity={user.id} isFollowing={isFollowing} isChatEnabled={stream.isChatEnabled} isChatDelayed={stream.isChatDelayed} isChatFollowersOnly={stream.isChatFollowersOnly} />
                </div>
            </LiveKitRoom>
        </>
    )
}

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    )
}