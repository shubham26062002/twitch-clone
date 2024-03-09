import { cn } from '@/lib/utils'

interface LiveBadgeProps {
    className?: string,
}

export const LiveBadge = ({
    className,
}: LiveBadgeProps) => {
    return (
        <div className={cn('bg-rose-500 text-center py-0.5 px-1.5 rounded-md uppercase text-[0.625rem] border border-background font-semibold tracking-wide', className)}>Live</div>
    )
}
