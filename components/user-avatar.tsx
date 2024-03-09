import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LiveBadge } from '@/components/live-badge'

const avatarVariants = cva(
    '',
    {
        variants: {
            size: {
                default: 'h-8 w-8',
                lg: 'h-14 w-14',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    },
)

interface UserAvatarProps extends VariantProps<typeof avatarVariants> {
    imageUrl: string,
    username: string,
    isLive?: boolean,
    isBadgeDisplayed?: boolean,
}

export const UserAvatar = ({
    imageUrl,
    username,
    isLive,
    isBadgeDisplayed,
    size,
}: UserAvatarProps) => {
    return (
        <div className="relative">
            <Avatar className={cn(isLive && 'ring-2 ring-rose-500 border border-background', avatarVariants({ size }))}>
                <AvatarImage className="object-cover" src={imageUrl} alt={username} />
                <AvatarFallback>{(username[0] + username[username.length - 1]).toUpperCase()}</AvatarFallback>
            </Avatar>

            {(isLive && isBadgeDisplayed) && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}

        </div>
    )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarVariants> {

}

export const UserAvatarSkeleton = ({
    size,
}: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn('rounded-full', avatarVariants({ size }))} />
    )
}
