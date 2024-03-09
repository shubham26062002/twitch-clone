import { headers } from 'next/headers'
import { WebhookReceiver } from 'livekit-server-sdk'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

const receiver = new WebhookReceiver(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!)

export const POST = async (
    request: NextRequest,
) => {
    const body = await request.text()

    const headerPayload = headers()

    const authorization = headerPayload.get('Authorization')

    if (!authorization) {
        return new NextResponse('Authorization header missing.', {
            status: 400,
        })
    }

    const event = receiver.receive(body, authorization)

    if (event.event === 'ingress_started') {
        await prisma.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isLive: true,
            },
        })
    }

    if (event.event === 'ingress_ended') {
        await prisma.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isLive: false,
            },
        })
    }

    return NextResponse.json('Webhook received.', {
        status: 200,
    })
}