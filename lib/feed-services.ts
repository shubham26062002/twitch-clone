import { prisma } from '@/lib/prisma'
import { getSelf } from '@/lib/auth-services'

export const getStreams = async () => {
    let userId

    try {
        const self = await getSelf()

        userId = self.id
    } catch (error) {
        userId = null
    }

    let streams = []

    if (userId) {
        streams = await prisma.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId,
                            },
                        },
                    },
                },
            },
            select: {
                thumbnailUrl: true,
                name: true,
                isLive: true,
                user: true,
                id: true,
            },
            orderBy: [
                {
                    isLive: 'desc',
                }, {
                    updatedAt: 'desc',
                },
            ],
        })
    } else {
        streams = await prisma.stream.findMany({
            select: {
                thumbnailUrl: true,
                name: true,
                isLive: true,
                user: true,
                id: true,
            },
            orderBy: [
                {
                    isLive: 'desc',
                }, {
                    updatedAt: 'desc',
                },
            ],
        })
    }

    return streams
}