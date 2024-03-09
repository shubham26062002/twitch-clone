'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import { ChatInformation } from './chat-information';

interface ChatFormProps {
    handleSubmit: () => void,
    message: string,
    handleChange: (messageValue: string) => void,
    isHidden: boolean,
    isChatDelayed: boolean,
    isChatFollowersOnly: boolean,
    isFollowing: boolean,
}

export const ChatForm = ({
    handleSubmit,
    message,
    handleChange,
    isHidden,
    isChatDelayed,
    isChatFollowersOnly,
    isFollowing,
}: ChatFormProps) => {
    const [isDelayed, setIsDelayed] = useState(false)

    const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing

    const isDisabled = isHidden || isFollowersOnlyAndNotFollowing || isDelayed

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        event.stopPropagation()

        if (!message || isDisabled) {
            return
        }

        if (isChatDelayed && !isDelayed) {
            setIsDelayed(true)

            setTimeout(() => {
                setIsDelayed(false)

                handleSubmit()
            }, 3000)
        } else {
            setIsDelayed(false)

            handleSubmit()
        }
    }

    if (isHidden) {
        return null
    }

    return (
        <form className="flex flex-col items-center gap-y-4 p-3" onSubmit={handleFormSubmit}>
            <div className="w-full">
                <ChatInformation isDelayed={isChatDelayed} isFollowersOnly={isChatFollowersOnly} />
                <Input className={cn('border-white/10', (isChatFollowersOnly || isChatDelayed) && 'rounded-t-none border-t-0')} placeholder="Send message..." onChange={(event) => handleChange(event.target.value)} value={message} disabled={isDisabled} />
            </div>
            <div className="ml-auto">
                <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>Send</Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="w-full h-10" />
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    )
}