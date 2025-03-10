import Header from '@/app/[lang]/(hydrogen)/home_page/hero_top/Header'
import Footer from '@/app/shared/home_page/sections/Footer'
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface BerylLiumLayoutProps {
  children: ReactNode
  lang: string
}

const BerylLiumLayoutHomePage: FC<BerylLiumLayoutProps> = ({ children, lang }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          className: 'text-sm',
        }}
      />
      <Header lang={lang} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default BerylLiumLayoutHomePage 