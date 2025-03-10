'use client';
import Link from 'next/link'
import Image from 'next/image'
import { routes } from '@/config/routes'
import { useTranslation } from '@/app/i18n/client';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/app/i18n/language-switcher';
import { useAuthModal } from '@/app/[lang]/api/auth/[...nextauth]/auth-provider';

export default function Header({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang || 'fr', 'common');
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === `/${lang}${path}` ? 'text-blue-500' : 'hover:text-blue-500';
  };
  const { showAuthModal } = useAuthModal();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    showAuthModal();
  };

  return (
    <div className="fix
    ed left-0 right-0 top-0 z-30 min-h-[70px] bg-primary-500 text-white transition-all duration-500">
      <div className="container app-container px-4 2xl:px-0 max-w-[1220px] mx-auto flex justify-between py-4 items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo_kevmax.svg"
            alt="KevMax Logo"
            width={133}
            height={46}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <LanguageSwitcher lang={lang || 'fr'} />
          <Link href={routes.home} className={`transition-colors ${isActive(routes.home)}`}>
            {t('text-home')}
          </Link>
          <Link href={routes.hero_top.services} className={`transition-colors ${isActive(routes.hero_top.services)}`}>
            Services
          </Link>
          <Link href={routes.hero_top.career} className={`transition-colors ${isActive(routes.hero_top.career)}`}>
            Career
          </Link>
          <Link href={routes.hero_top.about} className={`transition-colors ${isActive(routes.hero_top.about)}`}>
            About Us
          </Link>
          <Link
            href={routes.signIn}
            onClick={handleLoginClick}
            className={`transition-colors ${isActive(routes.signIn)}`}
          >
            Login
          </Link>
          <Link href={routes.auth.register} className={`transition-colors ${isActive(routes.auth.register)}`}>
            Register
          </Link>
        </nav>
      </div>
    </div>
  )
}
