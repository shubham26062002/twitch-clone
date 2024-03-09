'use server'

import { revalidatePath } from 'next/cache'
import { Stream } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { getSelf } from '@/lib/auth-services'
import { getStreamByUserId } from '@/lib/stream-services'

export const updateStream = async (values: Partial<Stream>) => {
    try {
        const self = await getSelf()

        const stream = await getStreamByUserId(self.id)

        if (!stream) {
            throw new Error('Stream not found')
        }

        const newData = {
            name: values.name,
            thumbnailUrl: values.thumbnailUrl,
            isChatEnabled: values.isChatEnabled,
            isChatDelayed: values.isChatDelayed,
            isChatFollowersOnly: values.isChatFollowersOnly,
        }

        const updatedStream = await prisma.stream.update({
            where: {
                id: stream.id,
            },
            data: {
                ...newData,
            },
        })

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        return updatedStream
    } catch (error) {
        throw new Error('Internal server error')
    }
}