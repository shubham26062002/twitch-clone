import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { Results, ResultsSkeleton } from './_components/results'

interface SearchPageProps {
    searchParams: {
        query?: string,
    },
}

const SearchPage = ({
    searchParams,
}: SearchPageProps) => {
    if (!searchParams.query) {
        return redirect('/')
    }

    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results query={searchParams.query} />
            </Suspense>
        </div>
    )
}

export default SearchPage