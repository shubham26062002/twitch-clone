import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useDashboardSidebar } from '@/hooks/use-dashboard-sidebar'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface NavigationItemProps {
    label: string,
    icon: LucideIcon,
    href: string,
    isActive: boolean,
}

export const NavigationItem = ({
    label,
    icon: Icon,
    href,
    isActive,
}: NavigationItemProps) => {
    const { isCollapsed } = useDashboardSidebar()

    return (
        <Button className={cn('w-full h-12', isCollapsed ? 'justify-center' : 'justify-start', isActive && 'bg-accent')} variant="ghost" asChild>
            <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon className={cn('h-4 w-4', isCollapsed ? 'mr-0' : 'mr-2')} />

                    {!isCollapsed && (
                        <span>{label}</span>
                    )}

                </div>
            </Link>
        </Button>
    )
}

export const NavigationItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[3rem] min-w-[3rem] rounded-md" />
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}