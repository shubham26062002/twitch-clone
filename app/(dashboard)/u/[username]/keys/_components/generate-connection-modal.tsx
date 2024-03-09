'use client'

import { AlertTriangle } from 'lucide-react'
import { IngressInput } from 'livekit-server-sdk'
import { useState, useTransition, useRef, ElementRef } from 'react'
import { toast } from 'sonner'

import { createIngress } from '@/actions/ingress'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'

const RTMP = String(IngressInput.RTMP_INPUT)

const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

export const GenerateConnectionModal = () => {
    const closeButtonRef = useRef<ElementRef<'button'>>(null)

    const [ingressType, setIngressType] = useState<IngressType>(RTMP)

    const [isLoading, startTransition] = useTransition()

    const handleGenerateButtonClick = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success(`New connection generated.`)

                    closeButtonRef.current?.click()
                })
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">Connect</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Select disabled={isLoading} value={ingressType} onValueChange={(value) => setIngressType(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="cursor-pointer" value={RTMP}>RTMP</SelectItem>
                        <SelectItem className="cursor-pointer" value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>Generating a new connection will reset all your active streams.</AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeButtonRef} asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button variant="primary" disabled={isLoading} onClick={handleGenerateButtonClick}>Generate</Button>
                </div>
            </DialogContent>
        </Dialog >
    )
}
