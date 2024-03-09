import { Check } from 'lucide-react'

export const VerifiedMark = () => {
    return (
        <div className="p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600">
            <Check className="h-[0.625rem] w-[0.625rem] text-primary stroke-[0.25rem]" />
        </div>
    )
}
