import { prisma } from '@/lib/prisma'
import { getSelf } from '@/lib/auth-services'

export const getSearchResults = async (query?: string) => {
    let userId

    try {
        const self = await getSelf()

        userId = self.id
    } catch (error) {
        userId = null
    }

    let searchResults = []

    if (userId) {
        searchResults = await prisma.stream.findMany({
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
                OR: [
                    {
                        name: {
                            contains: query,
                        },
                    }, {
                        user: {
                            username: {
                                contains: query,
                            },
                        },
                    },
                ],
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailUrl: true,
                updatedAt: true,
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
        searchResults = await prisma.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                        },
                    }, {
                        user: {
                            username: {
                                contains: query,
                            },
                        },
                    },
                ],
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailUrl: true,
                updatedAt: true,
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

    return searchResults
}