import { useMemo } from 'react'
import { Info } from 'lucide-react'

import { Hint } from '@/components/hint'

interface ChatInformationProps {
    isDelayed: boolean,
    isFollowersOnly: boolean,
}

export const ChatInformation = ({
    isDelayed,
    isFollowersOnly,
}: ChatInformationProps) => {
    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return 'Only followers can chat.'
        }

        if (isDelayed && !isFollowersOnly) {
            return 'Chat is delayed for readability.'
        }

        if (isDelayed && isFollowersOnly) {
            return 'Only followers can chat and chat is delayed for readability.'
        }

        return ''
    }, [isDelayed, isFollowersOnly])

    const label = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return 'Followers only chat'
        }

        if (isDelayed && !isFollowersOnly) {
            return 'Slow chat mode'
        }

        if (isDelayed && isFollowersOnly) {
            return 'Followers only chat and slow chat mode'
        }

        return ''
    }, [isDelayed, isFollowersOnly])

    if (!isDelayed && !isFollowersOnly) {
        return null
    }

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">{label}</p>
        </div>
    )
}
