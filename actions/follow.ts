'use server'

import { revalidatePath } from 'next/cache'

import { followUser } from '@/lib/follow-services'

export const handleFollow = async (userId: string) => {
    try {
        const follow = await followUser(userId)

        revalidatePath('/')

        if (follow) {
            revalidatePath(`/${follow.following.username}`)
        }

        return follow
    } catch (error) {
        throw new Error('Internal server error')
    }
}