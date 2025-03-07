import LoginHeader from '@/app/[lang]/(hydrogen)/home_page/hero_top/LoginHeader'
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface BerylLiumLayoutLoginProps {
    children: ReactNode
    lang: string
}

const BerylLiumLayoutLogin: FC<BerylLiumLayoutLoginProps> = ({ children, lang }) => {
    return (
        <div className="flex min-h-screen flex-col bg-transparent">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 5000,
                    className: 'text-sm',
                }}
            />

            <main className="flex-grow relative">
                <div className="absolute top-0 left-0 right-0 z-50">
                    <LoginHeader lang={lang} />
                </div>
                {children}
            </main>
        </div>
    )
}

export default BerylLiumLayoutLogin