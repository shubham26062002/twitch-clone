'use client'

import { toast } from 'sonner'
import { useTransition } from 'react'

import { updateStream } from '@/actions/stream'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'

interface ToggleCardProps {
    field: FieldTypes,
    label: string,
    value: boolean,
}

export const ToggleCard = ({
    field,
    label,
    value = false,
}: ToggleCardProps) => {
    const [isLoading, startTransition] = useTransition()

    const handleChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success('Chat settings updated.'))
                .catch(() => toast.error('Something went wrong.'))
        })
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">{label}</p>
                <div className="space-y-2">
                    <Switch checked={value} onCheckedChange={handleChange} disabled={isLoading}>{value ? 'On' : 'Off'}</Switch>
                </div>
            </div>
        </div>
    )
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton className="rounded-xl p-10 w-full" />
    )
}