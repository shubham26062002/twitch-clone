'use server'

import { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { getSelf } from '@/lib/auth-services'
import { prisma } from '@/lib/prisma'

export const updateUser = async (values: Partial<User>) => {
    const self = await getSelf()

    const newData = {
        bio: values.bio,
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: self.id,
        },
        data: {
            ...newData,
        },
    })

    revalidatePath(`/${self.username}`)

    revalidatePath(`/u/${self.username}`)

    return updatedUser
}