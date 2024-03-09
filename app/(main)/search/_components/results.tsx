import { getSearchResults } from '@/lib/search-services'
import { ResultCard, ResultCardSkeleton } from './result-card'
import { Skeleton } from '@/components/ui/skeleton'

interface ResultsProps {
    query?: string,
}

export const Results = async ({
    query,
}: ResultsProps) => {
    const searchResults = await getSearchResults(query)

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Matching results for "{query}"</h2>

            {searchResults.length === 0 && (
                <p className="text-muted-foreground text-sm">No matching results found.</p>
            )}

            <div className="flex flex-col gap-y-4">

                {searchResults.map((searchResult, index) => (
                    <ResultCard key={index} data={searchResult} />
                ))}

            </div>
        </div>
    )
}

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-8 w-[18.125rem] mb-4" />
            <div className="flex flex-col gap-y-4">

                {[...Array(4)].map((_, index) => (
                    <ResultCardSkeleton key={index} />
                ))}

            </div>
        </div>
    )
}
