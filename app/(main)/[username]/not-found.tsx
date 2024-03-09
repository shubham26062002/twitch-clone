import Link from 'next/link'

import { Button } from '@/components/ui/button'

const UserNotFound = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">404</h1>
            <p>Not able to find the user you were looking for.</p>
            <Button variant="secondary" asChild>
                <Link href="/">Go to home</Link>
            </Button>
        </div>
    )
}

export default UserNotFound