import Header from '@/app/[lang]/(hydrogen)/home_page/hero_top/Header'
import Footer from '@/app/shared/home_page/sections/Footer'
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface BerylLiumLayoutHomePageProps {
  children: ReactNode
  lang: string
}

const BerylLiumLayoutHomePage: FC<BerylLiumLayoutHomePageProps> = ({ children, lang }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
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