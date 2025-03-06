'use client';

import Link from 'next/link';
import logoImg from '@public/logo-primary.svg';
import logoImgText from '@public/logo-primary-text.svg';
import Image from 'next/image';
import { Title, Text, Button } from 'rizzui';
import { PiAppleLogo } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import OrSeparation from './or-separation';
import toast from 'react-hot-toast';
import { useTranslation } from '@/app/i18n/client';

export default function AuthWrapperOne({
  children,
  title,
  description,
  pageImage,
  isSocialLoginActive = false,
  isSignIn = false,
  lang,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  pageImage?: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  lang?: string;
}) {
  const { t } = useTranslation(lang!, 'auth');

  function handleSignIn() {
    toast.error(
      <Text>
        {t('auth-demo-text')}{' '}
        <Text as="b" className="font-semibold text-gray-900">
          {t('auth-sign-in')}
        </Text>{' '}
        {t('auth-button-to-login')}
      </Text>
    );
  }
  return (
    <>
      <div className="min-h-screen justify-between gap-x-8 px-4 py-8 pt-10 md:pt-12 lg:flex lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10 [&>div]:min-h-[calc(100vh-80px)]">
        <div className="relative flex w-full items-center justify-center lg:w-5/12 2xl:justify-end 2xl:pe-24">
          <div className=" w-full max-w-sm md:max-w-md lg:py-7 lg:ps-3 lg:pt-16 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
            <div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10">
              <Link
                href={'/'}
                className="mb-6 inline-flex max-w-[168px] xl:mb-8"
              >
                <Image src={logoImg} alt="PS" className={'h-16'} />
                <Image
                  src={logoImgText}
                  alt="Pos Suite"
                  className="ps-2.5 dark:invert h-16"
                />
              </Link>
              <Title
                as="h2"
                className="mb-5 text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl"
              >
                {title}
              </Title>
              <Text className=" leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14">
                {description}
              </Text>
            </div>
            {isSocialLoginActive && (
              <>
                <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 md:pb-6 xl:gap-5 xl:pb-7">
                  <Button
                    onClick={() =>
                      // it should be signIn('apple')
                      handleSignIn()
                    }
                    className="h-11 w-full"
                  >
                    <PiAppleLogo className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {t('auth-sign-in-with-apple')}
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      // it should be signIn('google')
                      handleSignIn()
                    }
                    className="h-11 w-full"
                  >
                    <FcGoogle className="me-2 h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {t('auth-sign-in-with-google')}
                    </span>
                  </Button>
                </div>
                <OrSeparation title="OR" className="mb-5 2xl:mb-7" isCenter />
              </>
            )}

            {children}
          </div>
        </div>
        <div className="hidden relative overflow-hidden w-7/12 items-center justify-center rounded-[20px] bg-gray-50 px-6 dark:bg-gray-100/40 lg:flex xl:justify-start 2xl:px-16">
            {pageImage}
        </div>
      </div>
    </>
  );
}
