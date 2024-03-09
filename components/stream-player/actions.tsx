'use client'

import { useAuth } from '@clerk/nextjs'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { handleFollow } from '@/actions/follow'
import { handleUnfollow } from '@/actions/unfollow'
import { Skeleton } from '@/components/ui/skeleton'

interface ActionsProps {
    isFollowing: boolean,
    hostIdentity: string,
    isHost: boolean,
}

export const Actions = ({
    isFollowing,
    hostIdentity,
    isHost,
}: ActionsProps) => {
    const { userId } = useAuth()

    const router = useRouter()

    const [isLoading, startTransition] = useTransition()

    const handleUnfollowButtonClick = () => {
        startTransition(() => {
            handleUnfollow(hostIdentity)
                .then((data) => toast.success(`Unfollowed ${data.following.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    const handleFollowButtonClick = () => {
        startTransition(() => {
            handleFollow(hostIdentity)
                .then((data) => toast.success(`Following ${data.following.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    const toggleFollow = () => {
        if (!userId) {
            return router.push('/sign-in')
        }

        if (isHost) {
            return
        }

        if (isFollowing) {
            handleUnfollowButtonClick()
        } else {
            handleFollowButtonClick()
        }
    }

    return (
        <Button className="w-full lg:w-auto" variant="primary" size="sm" disabled={isLoading || isHost} onClick={toggleFollow}>
            <Heart className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')} />
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}