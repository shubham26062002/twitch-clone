'use client'

import { Volume1, Volume2, VolumeX } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Slider } from '@/components/ui/slider'

interface VolumeControlProps {
    handleToggle: () => void,
    handleChange: (value: number) => void,
    value: number,
}

export const VolumeControl = ({
    handleToggle,
    handleChange,
    value,
}: VolumeControlProps) => {
    const isMuted = value === 0

    const isAboveHalf = value > 50

    let icon = <Volume1 className="h-6 w-6" />

    if (isMuted) {
        icon = <VolumeX className="h-6 w-6" />
    } else if (isAboveHalf) {
        icon = <Volume2 className="h-6 w-6" />
    }

    const label = isMuted ? 'Unmute' : 'Mute'

    const handleVolumeChange = (value: number[]) => {
        handleChange(value[0])
    }

    return (
        <div className="flex items-center gap-2">
            <Hint label={label} asChild>
                <button className="text-white hover:bg-white/10 rounded-lg p-1.5" onClick={handleToggle}>{icon}</button>
            </Hint>
            <Slider className="w-[8rem]" onValueChange={handleVolumeChange} value={[value]} max={100} step={1} />
        </div>
    )
}