import { redirect } from 'next/navigation'

import { getSelfByUsername } from '@/lib/auth-services'
import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'
import { Container } from './_components/container'

interface DashboardLayoutProps {
    children: React.ReactNode,
    params: {
        username: string,
    },
}

const DashboardLayout = async ({
    children,
    params,
}: DashboardLayoutProps) => {
    const self = await getSelfByUsername(params.username)

    if (!self) {
        return redirect('/')
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default DashboardLayout