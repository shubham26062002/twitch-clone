'use server'

import { revalidatePath } from 'next/cache'

import { unfollowUser } from '@/lib/follow-services'

export const handleUnfollow = async (userId: string) => {
    try {
        const follow = await unfollowUser(userId)

        revalidatePath('/')

        if (follow) {
            revalidatePath(`/${follow.following.username}`)
        }

        return follow
    } catch (error) {
        throw new Error('Internal server error')
    }
}