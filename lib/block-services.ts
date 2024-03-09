import { prisma } from '@/lib/prisma'
import { getSelf } from './auth-services'

export const isBlockedByUser = async (userId: string) => {
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
            return false
        }

        const isBlocked = await prisma.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id,
                },
            },
        }) ? true : false

        return isBlocked
    } catch (error) {
        return false
    }
}

export const blockUser = async (userId: string) => {
    const self = await getSelf()

    if (userId === self.id) {
        throw new Error('Cannot block yourself')
    }

    const otherUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!otherUser) {
        throw new Error('User not found')
    }

    const existingBlock = await prisma.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            },
        },
    })

    if (existingBlock) {
        throw new Error('Already blocked this user')
    }

    const block = await prisma.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true,
        },
    })

    return block
}

export const unblockUser = async (userId: string) => {
    const self = await getSelf()

    if (userId === self.id) {
        throw new Error('Cannot unblock yourself')
    }

    const otherUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!otherUser) {
        throw new Error('User not found')
    }

    const existingBlock = await prisma.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            },
        },
    })

    if (!existingBlock) {
        throw new Error('You have not blocked this user')
    }

    const block = await prisma.block.delete({
        where: {
            id: existingBlock.id,
        },
        include: {
            blocked: true,
        },
    })

    return block
}

export const getBlockedUsers = async () => {
    const self = await getSelf()

    const blocks = await prisma.block.findMany({
        where: {
            blockerId: self.id,
        },
        include: {
            blocked: true,
        }
    })

    return blocks
}