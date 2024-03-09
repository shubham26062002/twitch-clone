import { Suspense } from 'react'

import { Navbar } from './_components/navbar'
import { Sidebar, SidebarSkeleton } from './_components/sidebar'
import { Container } from './_components/container'

interface MainLayoutProps {
    children: React.ReactNode,
}

const MainLayout = ({
    children,
}: MainLayoutProps) => {
    return (
        <>
            <Navbar />
            <div className="h-full flex pt-20">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default MainLayout