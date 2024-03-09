'use client'

import { Edit } from 'lucide-react'
import { useState, useRef, useTransition, ElementRef } from 'react'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Hint } from '@/components/hint'
import { updateUser } from '@/actions/user'
import { toast } from 'sonner'

interface BioModalProps {
    initialBio: string | null,
}

export const BioModal = ({
    initialBio,
}: BioModalProps) => {
    const [bio, setBio] = useState(initialBio || '')

    const [isLoading, startTransition] = useTransition()

    const closeButtonRef = useRef<ElementRef<'button'>>(null)

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        startTransition(() => {
            updateUser({ bio })
                .then(() => {
                    toast.success('Bio updated successfully!')

                    closeButtonRef.current?.click()
                })
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-auto" variant="link" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Bio</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <Textarea className="resize-none" onChange={(event) => setBio(event.target.value)} value={bio} disabled={isLoading} />
                    <div className="flex justify-between">
                        <DialogClose ref={closeButtonRef} asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button variant="primary" disabled={isLoading} type="submit">Save Changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}