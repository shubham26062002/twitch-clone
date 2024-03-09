'use client'

import { toast } from 'sonner'
import { startTransition, useTransition } from 'react'
import { MinusCircle } from 'lucide-react'

import { Hint } from '@/components/hint'
import { handleBlock } from '@/actions/block'
import { cn, stringToColor } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface CommunityItemProps {
    hostName: string,
    viewerName: string,
    participantName: string,
    participantIdentity: string,
}

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity,
}: CommunityItemProps) => {
    const color = stringToColor(participantName)

    const isSelf = participantName === viewerName

    const isHost = viewerName === hostName

    const [isLoading, startTransition] = useTransition()

    const handleBlockButtonClick = () => {
        if (!participantName || isSelf || !isHost) {
            return
        }

        startTransition(() => {
            handleBlock(participantIdentity)
                .then((data) => toast.success(`Blocked ${data?.blocked.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    return (
        <div className={cn('group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/10', isLoading && 'opacity-50 pointer-events-none')}>
            <p style={{ color }}>{participantName}</p>

            {(isHost && !isSelf) && (
                <Hint label="Block">
                    <Button className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition" variant="ghost" disabled={isLoading} onClick={handleBlockButtonClick}>
                        <MinusCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </Hint>
            )}

        </div>
    )
}