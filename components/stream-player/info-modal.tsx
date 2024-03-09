'use client'

import { toast } from 'sonner'
import { Edit, Trash } from 'lucide-react'
import { useState, useTransition, useRef, ElementRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { updateStream } from '@/actions/stream'
import { UploadDropzone } from '@/lib/uploadthing'
import { Hint } from '@/components/hint'

interface InfoModalProps {
    initialName: string,
    initialThumbnailUrl: string | null,
}

export const InfoModal = ({
    initialName,
    initialThumbnailUrl,
}: InfoModalProps) => {
    const [name, setName] = useState(initialName)

    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

    const [isLoading, startTransition] = useTransition()

    const closeButtonRef = useRef<ElementRef<'button'>>(null)

    const router = useRouter()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success('Stream info updated!')

                    closeButtonRef.current?.click()
                })
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    const handleRemoveThumbnail = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    setThumbnailUrl('')

                    router.refresh()
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
                    <DialogTitle>Edit Stream Info</DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={name} disabled={isLoading} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>

                        {thumbnailUrl ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                <div className="absolute top-2 right-2 z-10">
                                    <Hint label="Remove thumbnail" side="left" asChild>
                                        <Button className="h-auto w-auto p-1.5 bg-rose-500 hover:bg-rose-600" variant="destructive" type="button" disabled={isLoading} onClick={handleRemoveThumbnail}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image className="object-cover" src={thumbnailUrl} alt={name} fill />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone endpoint="thumbnail" appearance={{
                                    label: {
                                        color: '#ffffff',
                                    },
                                    allowedContent: {
                                        color: '#ffffff',
                                    },
                                }}
                                    onClientUploadComplete={(response) => {
                                        setThumbnailUrl(response?.[0].url as string)

                                        router.refresh()
                                    }}
                                />
                            </div>
                        )}

                    </div>
                    <div className="flex justify-between">
                        <DialogClose ref={closeButtonRef} asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button variant="primary" disabled={isLoading} type="submit">Save Changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}