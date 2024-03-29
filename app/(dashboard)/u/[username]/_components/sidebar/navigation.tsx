'use client'

import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react'
import { NavigationItem, NavigationItemSkeleton } from './navigation-item'

export const Navigation = () => {
    const pathname = usePathname()

    const { user } = useUser()

    const routes = [
        {
            label: 'Stream',
            href: `/u/${user?.username}`,
            icon: Fullscreen,
        }, {
            label: 'Keys',
            href: `/u/${user?.username}/keys`,
            icon: KeyRound,
        }, {
            label: 'Chat',
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare,
        }, {
            label: 'Community',
            href: `/u/${user?.username}/community`,
            icon: Users,
        },
    ]

    if (!user) {
        return (
            <ul className="space-y-2">

                {[...Array(4)].map((_, index) => (
                    <NavigationItemSkeleton key={index} />
                ))}

            </ul>
        )
    }

    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">

            {routes.map((route, index) => (
                <NavigationItem key={index} label={route.label} icon={route.icon} href={route.href} isActive={route.href === pathname} />
            ))}

        </ul>
    )
}
