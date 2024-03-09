'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface CopyButtonProps {
    value?: string,
}

export const CopyButton = ({
    value,
}: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyButtonClick = () => {
        if (!value) {
            return
        }

        setIsCopied(true)

        navigator.clipboard.writeText(value)

        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }

    const icon = isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />

    return (
        <Button onClick={handleCopyButtonClick} disabled={!value || isCopied} variant="ghost" size="sm">{icon}</Button>
    )
}