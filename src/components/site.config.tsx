import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { LAYOUT_OPTIONS } from '@/config/enums';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: "HoldMyFuture - Page d'accueil",
  description: "Que vous prépariez le TCF pour des études, un projet professionnel ou une immigration, notre application vous offre une méthode interactive et personnalisée pour maîtriser le français. Avec des leçons adaptées à tous les niveaux (A1 à C2), des exercices pratiques, des simulations d'examen et des conseils d'experts, vous progresserez rapidement et efficacement. Profitez d'un apprentissage flexible, accessible où que vous soyez, et bénéficiez d'un suivi personnalisé pour atteindre vos objectifs. Prêt à relever le défi ? Téléchargez l'application et commencez votre voyage vers la réussite du TCF dès aujourd'hui !",
  logo: {
    src: '/logo-primary.svg',
    width: 258,
    height: 50,
  },
  icon: {
    src: '/logo-short.svg',
    width: 40,
    height: 40,
  },
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.BERYLLIUM,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - HoldMyFuture` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - HoldMyFuture` : title,
      description,
      url: 'https://app.pos-suite.com',
      siteName: 'HoldMyFuture',
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'fr_FR',
      type: 'website',
    },
  };
}
