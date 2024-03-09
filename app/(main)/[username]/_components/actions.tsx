'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { handleFollow } from '@/actions/follow'
import { handleUnfollow } from '@/actions/unfollow'
import { handleBlock } from '@/actions/block'
import { handleUnblock } from '@/actions/unblock'

interface ActionsProps {
    isFollowing: boolean,
    userId: string,
}

export const Actions = ({
    isFollowing,
    userId,
}: ActionsProps) => {
    const [isLoading, startTransition] = useTransition()

    const handleFollowButtonClick = () => {
        startTransition(() => {
            handleFollow(userId)
                .then((data) => toast.success(`Following ${data.following.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    const handleUnfollowButtonClick = () => {
        startTransition(() => {
            handleUnfollow(userId)
                .then((data) => toast.success(`Unfollowed ${data.following.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    const handleBlockButtonClick = () => {
        startTransition(() => {
            handleBlock(userId)
                .then((data) => toast.success(`Blocked ${data?.blocked.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    const handleUnblockButtonClick = () => {
        startTransition(() => {
            handleUnblock(userId)
                .then((data) => toast.success(`Unblocked ${data.blocked.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    return (
        <>
            <Button variant="primary" disabled={isLoading} onClick={isFollowing ? handleUnfollowButtonClick : handleFollowButtonClick}>{isFollowing ? 'Unfollow' : 'Follow'}</Button>
            <Button variant="destructive" disabled={isLoading} onClick={handleBlockButtonClick}>Block</Button>
            <Button variant="destructive" disabled={isLoading} onClick={handleUnblockButtonClick}>Unblock</Button>
        </>
    )
}
