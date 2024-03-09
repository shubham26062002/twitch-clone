import { Logo } from '@/app/(auth)/_components/logo'

interface AuthLayoutProps {
    children: React.ReactNode,
}

const AuthLayout = ({
    children,
}: AuthLayoutProps) => {
    return (
        <main className="h-full flex flex-col justify-center items-center space-y-6">
            <Logo />
            {children}
        </main>
    )
}

export default AuthLayout