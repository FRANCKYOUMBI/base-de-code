import { FC } from 'react'
import Image from 'next/image'

interface CareerCardProps {
  title: string
  description: string
}

export const careerPositions = [
  {
    title: "Développeur Web Full Stack",
    description: "Nous recherchons un développeur web passionné avec une expérience en React, Node.js et bases de données. Vous travaillerez sur des projets innovants dans une équipe dynamique."
  },
  {
    title: "Designer UI/UX",
    description: "Rejoignez notre équipe créative pour concevoir des interfaces utilisateur exceptionnelles. Expérience en Figma et principes de design requis."
  },
  {
    title: "Développeur Mobile",
    description: "Développeur mobile expérimenté en React Native ou Flutter pour créer des applications mobiles innovantes."
  }
]

export const faqItems = [
  {
    question: "Quels services offrez-vous?",
    answer: "Nos services de développement et de support de logiciels incluent le développement de logiciels personnalisés, la maintenance et le support des logiciels existants, ainsi que des services de conseil pour les entreprises qui cherchent à améliorer leurs processus logiciels."
  },
  {
    question: "Comment gérez-vous le cadrage et l'estimation du projet ?",
    answer: "Nous travaillons avec nos clients pour définir clairement la portée de leur projet et fournir des estimations précises du temps et des ressources nécessaires pour terminer le travail."
  },
  {
    question: "Comment gérez-vous la sécurité et la protection des données dans votre processus de développement logiciel ?",
    answer: "La sécurité et la protection des données sont pour nous des priorités absolues. Nous suivons les meilleures pratiques standard de l'industrie pour nous assurer que nos logiciels sont sécurisés et que les données de nos clients sont protégées à tout moment."
  },
  {
    question: "Avez-vous une expérience de travail avec des technologies ou des industries spécifiques?",
    answer: "Notre équipe a de l'expérience avec un large éventail de technologies et d'industries. Nous cherchons toujours à élargir notre expertise et à relever de nouveaux défis."
  },
  {
    question: "Comment gérez-vous la tarification de vos services ?",
    answer: "Nous offrons des prix compétitifs pour nos services de développement et de support de logiciels. Nous travaillons avec nos clients pour comprendre leurs contraintes budgétaires et fournir des estimations de prix personnalisées qui répondent à leurs besoins."
  }
]

const CareerCard: FC<CareerCardProps> = ({ title, description }) => {
  return (
    <div className="max-w-[412px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] flex flex-col h-full items-center justify-center text-noir text-center p-4 rounded-[10px] bg-white">
      <div className="mb-[10px]"></div>
      <h5 className="mb-12 text-center">{title}</h5>
      <p className="text-sm font-normal">{description}</p>
    </div>
  )
}

export default CareerCard 