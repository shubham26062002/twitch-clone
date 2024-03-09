import { prisma } from '@/lib/prisma'
import { getSelf } from '@/lib/auth-services'

export const getRecommended = async () => {
    let userId

    try {
        const self = await getSelf()

        userId = self.id
    } catch (error) {
        userId = null
    }

    let users = []

    if (userId) {
        users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId,
                        },
                    }, {
                        NOT: {
                            followers: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    }, {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId,
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                stream: {
                    select: {
                        isLive: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    } else {
        users = await prisma.user.findMany({
            include: {
                stream: {
                    select: {
                        isLive: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    return users
}