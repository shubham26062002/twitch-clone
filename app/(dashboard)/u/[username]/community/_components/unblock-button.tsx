'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { handleUnblock } from '@/actions/unblock'
import { Button } from '@/components/ui/button'

interface UnblockButtonProps {
    userId: string,
}

export const UnblockButton = ({
    userId,
}: UnblockButtonProps) => {
    const [isLoading, startTransition] = useTransition()

    const onClick = () => {
        startTransition(() => {
            handleUnblock(userId)
                .then((result) => toast.success(`Unblocked ${result.blocked.username}!`))
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    return (
        <Button className="text-blue-500 w-full" disabled={isLoading} onClick={onClick} variant="link" size="sm" >Unblock</Button>
    )
}
