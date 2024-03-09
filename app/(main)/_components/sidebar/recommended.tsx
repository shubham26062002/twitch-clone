'use client'

import { User } from '@prisma/client'

import { useSidebar } from '@/hooks/use-sidebar'
import { UserItem, UserItemSkeleton } from './user-item'

interface RecommendedProps {
    data: (User & {
        stream: {
            isLive: boolean,
        } | null,
    })[],
}

export const Recommended = ({
    data,
}: RecommendedProps) => {
    const { isCollapsed } = useSidebar()

    return (
        <div>

            {(!isCollapsed && data.length > 0) && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Recommended</p>
                </div>
            )}

            <ul className="space-y-2 px-2">

                {data.map((user, index) => (
                    <UserItem key={index} username={user.username} imageUrl={user.imageUrl} isLive={!!user.stream?.isLive} />
                ))}

            </ul>
        </div>
    )
}

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">


            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index} />
            ))}

        </ul>
    )
}