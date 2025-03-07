import Image from 'next/image';
import SignInForm from './sign-in-form';
import wrapperImg from '@public/bag.png';
import { metaObject } from '@/components/site.config';
import UnderlineShape from '@/components/shape/underline';

export const metadata = {
  ...metaObject('Connectez-vous à votre compte - HoldMyFuture'),
}

interface SignInParamsProps {
  lang: string;
}

interface SignInProps {
  params: SignInParamsProps;
}

export default function SignIn({ params: { lang } }: SignInProps) {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src={wrapperImg}
        alt="Image"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">
              Bienvenue sur{' '}
              <span className="relative inline-block">
                HoldMyFuture
                <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-primary md:w-28 xl:-bottom-1.5 xl:w-36" />
              </span>{' '}
              !
            </h2>
          </div>
          <SignInForm lang={lang} />
        </div>
      </div>
    </div>
  );
}
