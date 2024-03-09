import { createUploadthing, type FileRouter } from 'uploadthing/next'

import { getSelf } from '@/lib/auth-services'
import { prisma } from '@/lib/prisma'

const f = createUploadthing()

const auth = (req: Request) => ({ id: 'fakeId' })

export const ourFileRouter = {
    thumbnail: f({
        image: {
            maxFileSize: '4MB',
            maxFileCount: 1,
        },
    })
        .middleware(async () => {
            const self = await getSelf()

            return { user: self }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await prisma.stream.update({
                where: {
                    userId: metadata.user.id,
                },
                data: {
                    thumbnailUrl: file.url,
                },
            })

            // return { thumbnailUrl: file.url }
        })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter