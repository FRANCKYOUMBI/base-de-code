'use client';
import Link from 'next/link'
import LanguageSwitcher from '@/app/i18n/language-switcher';

export default function LoginHeader({ lang }: { lang?: string }) {

    return (

        <div className="flex justify-start gap-3 pl-5 pt-6 items-center">
            <Link href="/">
                <p className='px-3 py-2 rounded-xl bg-gray-100 font-bold text-primary text-xl hover:bg-primary hover:text-white'>HoldMyFuture</p>
            </Link>
            <LanguageSwitcher lang={lang || 'fr'} />

        </div>
    )
}
