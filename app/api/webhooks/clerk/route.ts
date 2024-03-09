import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { resetIngresses } from '@/actions/ingress'

export const POST = async (
    request: NextRequest,
) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const headerPayload = headers()
    const svixId = headerPayload.get('svix-id')
    const svixTimestamp = headerPayload.get('svix-timestamp')
    const svixSignature = headerPayload.get('svix-signature')

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new NextResponse('Svix headers missing.', {
            status: 400,
        })
    }

    const payload = await request.json()

    const body = JSON.stringify(payload)

    const webhook = new Webhook(WEBHOOK_SECRET)

    let event: WebhookEvent

    try {
        event = webhook.verify(body, {
            'svix-id': svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature,
        }) as WebhookEvent
    } catch (error) {
        return new NextResponse('Svix signature verification failed.', {
            status: 400,
        })
    }

    const eventType = event.type

    if (eventType === 'user.created') {
        await prisma.user.create({
            data: {
                username: payload.data.username,
                imageUrl: payload.data.image_url,
                externalUserId: payload.data.id,
                stream: {
                    create: {
                        name: `${payload.data.username}'s stream`,
                    },
                },
            },
        })
    }

    if (eventType === 'user.updated') {
        await prisma.user.update({
            where: {
                externalUserId: payload.data.id,
            },
            data: {
                username: payload.data.username,
                imageUrl: payload.data.image_url,
            },
        })
    }

    if (eventType === 'user.deleted') {
        await resetIngresses(payload.data.id)

        await prisma.user.delete({
            where: {
                externalUserId: payload.data.id,
            },
        })
    }

    return NextResponse.json('Webhook received.', {
        status: 200,
    })
}