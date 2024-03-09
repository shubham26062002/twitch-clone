'use client'

import { Maximize, Minimize } from 'lucide-react'

import { Hint } from '@/components/hint'

interface FullScreenControlProps {
    isFullScreen: boolean,
    handleToggle: () => void,
}

export const FullScreenControl = ({
    isFullScreen,
    handleToggle,
}: FullScreenControlProps) => {
    const icon = isFullScreen ? <Minimize className="h-5 w-4" /> : <Maximize className="h-5 w-4" />

    const label = isFullScreen ? 'Exit full screen' : 'Enter full screen'

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button className="text-white p-1.5 hover:bg-white/10 rounded-lg" onClick={handleToggle}>{icon}</button>
            </Hint>
        </div>
    )
}
