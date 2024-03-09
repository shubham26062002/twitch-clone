'use server'

import { revalidatePath } from 'next/cache'

import { unblockUser } from '@/lib/block-services'
import { getSelf } from '@/lib/auth-services'

export const handleUnblock = async (userId: string) => {
    const self = await getSelf()

    const block = await unblockUser(userId)

    revalidatePath(`/u/${self.username}/community`)

    return block
}