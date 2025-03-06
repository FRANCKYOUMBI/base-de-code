import { Metadata } from 'next'
import ServiceCard, { webDevServices, designServices, collaborationSteps } from './ServiceCard'
import { routes } from "@/config/routes"
import Button from '@/components/Button'
import Image from 'next/image';
import PageHeader from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Services - KevMax SARL',
  description: "L'agence digitale et créative",
}

export default function ServicesPage() {
  const pageHeader = {
    title: "Nos services",
    breadcrumb: [
      {
        href: routes.home,
        name: "Accueil",
      },
      {
        name: "Services",
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