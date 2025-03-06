import { Metadata } from 'next'
import AboutUsCard, { aboutUsCards, StatCard } from './AboutUsCard'
import { routes } from "@/config/routes"
import PageHeader from '@/components/page-header'


export const metadata: Metadata = {
  title: 'À propos - KevMax SARL',
  description: "L'agence digitale et créative",
}

export default function AboutPage() {
  const pageHeader = {
    title: "À propos de nous",
    breadcrumb: [
      {
        href: routes.home,
        name: "Accueil",
      },
      {
        name: "À propos",
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
        <div className="">
        </div>
      </PageHeader>
    </>
  )
} 