'use server'

import { revalidatePath } from 'next/cache'
import { RoomServiceClient } from 'livekit-server-sdk'

import { blockUser } from '@/lib/block-services'
import { getSelf } from '@/lib/auth-services'

const roomService = new RoomServiceClient(process.env.LIVEKIT_API_URL!, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET)

export const handleBlock = async (userId: string) => {
    const self = await getSelf()

    let block

    try {
        block = await blockUser(userId)
    } catch (error) {
    }

    try {
        await roomService.removeParticipant(self.id, userId)
    } catch (error) {

    }

    revalidatePath(`/u/${self.username}/community`)

    return block
}