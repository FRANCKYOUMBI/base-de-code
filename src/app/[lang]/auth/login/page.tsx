import Image from 'next/image';
import SignInForm from './sign-in-form';
import wrapperImg from '@public/bag.png';
import { metaObject } from '@/components/site.config';
import AuthWrapperOne from '@/components/auth-wrapper-one';
import UnderlineShape from '@/components/shape/underline';

export const metadata = {
  ...metaObject('Connectez-vous à votre compte - Pos Suite'),
}

interface SignInParamsProps {
    lang: string;
}

interface SignInProps {
    params: SignInParamsProps;
}

export default function SignIn({ params: { lang } }: SignInProps) {
  return (
    <AuthWrapperOne
      title={
        <>
          Bienvenue sur {' '}
          <span className="relative inline-block">
            Pos Suite
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-primary md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}
          !
        </>
      }
      description="En vous connectant, vous acceptez les conditions d'utilisation et la politique de confidentialité de notre plateforme."
      isSocialLoginActive={false}
      pageImage={
          <Image
            src={wrapperImg}
            alt="Image de la boutique"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
      }
    >
      <SignInForm lang={lang}/>
    </AuthWrapperOne>
  );
}
