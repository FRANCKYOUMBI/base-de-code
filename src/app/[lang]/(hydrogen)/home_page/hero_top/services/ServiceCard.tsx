import { FC } from 'react'
import Image from 'next/image'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

export const webDevServices = [
  {
    title: "Développement d'applications web",
    description: "Création d'application web SPA et PWA pour offrir la meilleure expérience utilisateur à vos clients et partenaires.",
    icon: "/icons/web_app_dev.svg"
  },
  {
    title: "Développement de sites web et e-commerce",
    description: "Création de site internet, blog et e-commerce basée sur les technologies web permettant de faire des PWA",
    icon: "/icons/ecommerce_dev.svg"
  },
  {
    title: "Développement d'applications mobile",
    description: "Création d'application mobile natif & hybride pour vos applications de gestion, sites internet, sites E-commerce pour mieux fidéliser vos clients.",
    icon: "/icons/mobile_dev.svg"
  }
]

export const designServices = [
  {
    title: "Design & Conception",
    description: "Processus d'écriture d'un site ou d'une page web dans un langage technique, une étape incontournable pour qu'un contenu soit mis en ligne et atteigne ses lecteurs.",
    icon: "/icons/design.svg"
  }
]

export const collaborationSteps = [
  {
    title: "Découvrir",
    description: "Nous explorons votre vision, réfléchissons à vos idées et apprenons les besoins de votre entreprise."
  },
  {
    title: "Conseiller",
    description: "Nous vous proposons des solutions qui alignent vos objectifs avec les besoins de vos futures clients."
  }
]

const ServiceCard: FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4 h-16 w-16 relative">
        <Image
          src={icon}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default ServiceCard 