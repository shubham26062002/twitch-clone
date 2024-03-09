'use client'

import { useSidebar } from '@/hooks/use-sidebar'
import { Follow, User } from '@prisma/client'
import { UserItem, UserItemSkeleton } from './user-item'

interface FollowingProps {
    data: (Follow & {
        following: (User & {
            stream: {
                isLive: boolean,
            } | null,
        }),
    })[],
}
export const Following = ({
    data,
}: FollowingProps) => {
    const { isCollapsed } = useSidebar()

    if (!data.length) {
        return null
    }


    return (
        <div>

            {!isCollapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}

            <ul className="space-y-2 px-2">

                {data.map((follow, index) => (
                    <UserItem key={index} username={follow.following.username} imageUrl={follow.following.imageUrl} isLive={!!follow.following.stream?.isLive} />
                ))}

            </ul>
        </div>
    )
}

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">

            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index} />
            ))}

        </ul>
    )
}