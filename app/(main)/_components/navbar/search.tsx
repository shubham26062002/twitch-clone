'use client'

import qs from 'query-string'
import { useState } from 'react'
import { X, Search as SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Search = () => {
    const router = useRouter()

    const [query, setQuery] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!query) {
            return
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query: {
                query,
            },
        }, {
            skipEmptyString: true,
        })

        router.push(url)
    }

    return (
        <form className="relative w-full lg:w-[25rem] flex items-center" onSubmit={handleSubmit}>
            <Input className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search..." />

            {query && (
                <X className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" onClick={() => setQuery('')} />
            )}

            <Button className="rounded-l-none" type="submit" size="icon" variant="secondary">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    )
}
