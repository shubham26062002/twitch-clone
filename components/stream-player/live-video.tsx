'use client'

import { Participant, Track } from 'livekit-client'
import { useRef, useState, useEffect } from 'react'
import { useTracks } from '@livekit/components-react'
import { useEventListener } from 'usehooks-ts'

import { FullScreenControl } from './full-screen-control'
import { VolumeControl } from './volume-control'

interface LiveVideoProps {
    participant: Participant,
}

export const LiveVideo = ({
    participant,
}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    const wrapperRef = useRef<HTMLDivElement>(null)

    const [isFullScreen, setIsFullScreen] = useState(false)

    const [volume, setVolume] = useState(0)

    const handleToggle = () => {
        if (isFullScreen) {
            document.exitFullscreen()
        } else if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen()
        }
    }

    const handleFullScreenChange = () => {
        const isCurrentlyFullScreen = document.fullscreenElement !== null

        setIsFullScreen(isCurrentlyFullScreen)
    }

    useEventListener('fullscreenchange', handleFullScreenChange, wrapperRef)

    const handleVolumeChange = (value: number) => {
        setVolume(+value)

        if (videoRef.current) {
            videoRef.current.muted = value === 0

            videoRef.current.volume = +value * 0.01
        }
    }

    const handleToggleMute = () => {
        const isMuted = volume === 0

        setVolume(isMuted ? 50 : 0)

        if (videoRef.current) {
            videoRef.current.muted = !isMuted

            videoRef.current.volume = isMuted ? 0.5 : 0
        }
    }

    useEffect(() => {
        handleVolumeChange(0)
    }, [])

    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((track) => track.participant.identity === participant.identity).forEach((track) => {
        if (videoRef.current) {
            track.publication.track?.attach(videoRef.current)
        }
    })

    return (
        <div className="relative h-full flex" ref={wrapperRef}>
            <video className="w-full" ref={videoRef} />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl handleChange={handleVolumeChange} value={volume} handleToggle={handleToggleMute} />
                    <FullScreenControl isFullScreen={isFullScreen} handleToggle={handleToggle} />
                </div>
            </div>
        </div>
    )
}
