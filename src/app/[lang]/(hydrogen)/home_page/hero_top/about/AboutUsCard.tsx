import { FC } from 'react'
import Image from 'next/image'

interface AboutUsCardProps {
  title: string
  description: string
  icon: string
}

interface StatCardProps {
  number: number
  text: string
}

export const aboutUsCards = [
  {
    title: "Design UX",
    description: "Cela concerne la conception de l'expérience utilisateur d'un logiciel ou d'un site web, en prenant en compte les besoins, les attentes et les comportements des utilisateurs pour créer une expérience utilisateur optimale.",
    icon: "/icons/ux_design.svg"
  },
  {
    title: "Développement Web",
    description: "Nous développons des sites web et applications sur mesure en utilisant les dernières technologies pour répondre à vos besoins spécifiques.",
    icon: "/icons/web_dev.svg"
  },
  {
    title: "Marketing Digital",
    description: "Nous vous aidons à développer votre présence en ligne et à atteindre vos objectifs commerciaux grâce à des stratégies marketing efficaces.",
    icon: "/icons/digital_marketing.svg"
  }
]

export const StatCard: FC<StatCardProps> = ({ number, text }) => (
  <div className="bg-white rounded-[10px] h-[367px] p-4 text-center w-full xs:w-[278px]">
    <div className="mb-6 flex min-h-[158px] justify-center"></div>
    <p className="text-primary-500 m-0 mt-8 text-[60px] font-[600]">+{number}</p>
    <p className="text-[#A7ADAF] m-0 mt-5 text-[25px]">{text}</p>
  </div>
)

const AboutUsCard: FC<AboutUsCardProps> = ({ title, description, icon }) => {
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

export default AboutUsCard 