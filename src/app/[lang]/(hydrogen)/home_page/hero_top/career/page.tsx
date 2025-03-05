import { Metadata } from 'next'
import CareerCard, { careerPositions, faqItems } from './CareerCard'
import { routes } from "@/config/routes"
import PageHeader from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Carrières - KevMax SARL',
  description: "L'agence digitale et créative",
}

export default function CareerPage() {
  const pageHeader = {
    title: "Carrières",
    breadcrumb: [
      {
        href: routes.home,
        name: "Accueil",
      },
      {
        name: "Carrières",
      },
    ],
  }

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        className="[&_h2]:font-lexend [&_h2]:font-bold pl-40"
      >
        <main className="">

        </main>
      </PageHeader>
    </>
  )
}
