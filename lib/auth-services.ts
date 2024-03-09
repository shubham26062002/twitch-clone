import { currentUser } from '@clerk/nextjs'

import { prisma } from '@/lib/prisma'

export const getSelf = async () => {
    const self = await currentUser()

    if (!self) {
        throw new Error('Unauthorized')
    }

    const user = await prisma.user.findUnique({
        where: {
            externalUserId: self.id,
        },
    })

    if (!user) {
        throw new Error('Not Found')
    }

    return user
}

export const getUserByUsername = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            username: true,
            bio: true,
            imageUrl: true,
            externalUserId: true,
            stream: {
                select: {
                    id: true,
                    isLive: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnailUrl: true,
                    name: true,
                },
            },
            _count: {
                select: {
                    followers: true,
                },
            },
        },
    })

    return user
}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser()

    if (!self) {
        throw new Error('Unauthorized')
    }

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    })

    if (!user) {
        throw new Error('Not Found')
    }

    if (self.username !== user.username) {
        throw new Error('Unauthorized')
    }

    return user
}

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            stream: true,
        },
    })

    return user
}