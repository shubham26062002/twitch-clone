import { prisma } from '@/lib/prisma'
import { getSelf } from '@/lib/auth-services'

export const isFollowingUser = async (userId: string) => {
    try {
        const self = await getSelf()

        const otherUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!otherUser) {
            throw new Error('User not found')
        }

        if (otherUser.id === self.id) {
            return true
        }

        const isFollowing = await prisma.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            },
        }) ? true : false

        return isFollowing
    } catch (error) {
        return false
    }
}

export const followUser = async (userId: string) => {
    const self = await getSelf()

    const otherUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!otherUser) {
        throw new Error('User not found')
    }

    if (otherUser.id === self.id) {
        throw new Error('Cannot follow yourself')
    }

    const isFollowing = await prisma.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    }) ? true : false

    if (isFollowing) {
        throw new Error('Already following this user')
    }

    const follow = await prisma.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            follower: true,
            following: true,
        },
    })

    return follow
}

export const unfollowUser = async (userId: string) => {
    const self = await getSelf()

    const otherUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!otherUser) {
        throw new Error('User not found')
    }

    if (otherUser.id === self.id) {
        throw new Error('Cannot unfollow yourself')
    }

    const existingFollow = await prisma.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    })

    if (!existingFollow) {
        throw new Error('Not following this user')
    }

    const follow = await prisma.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            follower: true,
            following: true,
        },
    })

    return follow
}

export const getFollowingUsers = async () => {
    try {
        const self = await getSelf()

        const follow = await prisma.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id,
                        },
                    },
                },
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true,
                            },
                        },
                    },
                },
            },
        })

        return follow
    } catch (error) {
        return []
    }
}