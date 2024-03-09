'use client'

import { useParticipants } from '@livekit/components-react'
import { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CommunityItem } from '@/components/stream-player/community-item'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'

interface ChatCommunityProps {
    isHidden: boolean,
    viewerName: string,
    hostName: string,
}

export const ChatCommunity = ({
    isHidden,
    viewerName,
    hostName,
}: ChatCommunityProps) => {
    const participants = useParticipants()

    const [value, setValue] = useState('')

    const debouncedValue = useDebounce<string>(value, 1000)

    const handleChange = (value: string) => {
        setValue(value)
    }

    const filteredParticipants = useMemo(() => {
        const dedupedParticipants = participants.reduce((accumulator, participant) => {
            const hostAsViewer = `host#${participant.identity}`

            if (!accumulator.some((p) => p.identity === hostAsViewer)) {
                accumulator.push(participant)
            }

            return accumulator
        }, [] as (RemoteParticipant | LocalParticipant)[])

        return dedupedParticipants.filter((participant) => participant.name?.toLowerCase().includes(debouncedValue.toLowerCase()
        ))
    }, [participants, debouncedValue])

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">Community is disabled.</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <Input className="border-white/10" placeholder="Search community..." onChange={(event) => handleChange(event.target.value)} />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">No results found.</p>

                {filteredParticipants.map((participant, index) => (
                    <CommunityItem key={index} hostName={hostName} viewerName={viewerName} participantName={participant.name!} participantIdentity={participant.identity} />
                ))}

            </ScrollArea>
        </div>
    )
}
