import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { LAYOUT_OPTIONS } from '@/config/enums';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Pos Suite - Gestion',
  description: `Gestion de caisse et de stock pour les restaurants, les bars, les cafés, les hôtels, les magasins de détail et les entreprises de services.`,
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
    title: title ? `${title} - Pos Suite` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Pos Suite` : title,
      description,
      url: 'https://app.pos-suite.com',
      siteName: 'Pos Suite',
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
}
