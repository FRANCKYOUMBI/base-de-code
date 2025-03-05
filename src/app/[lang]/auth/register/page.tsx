import Image from 'next/image';
import wrapperImg from '@public/bag.png';
import { metaObject } from '@/components/site.config';
import AuthWrapperOne from '@/components/auth-wrapper-one';
import SignUpForm from './sign-up-form';

export const metadata = {
  ...metaObject('Inscrivez-vous à votre compte'),
}

interface SignUpParamsProps {
    lang: string;
}

interface SignUpProps {
    params: SignUpParamsProps;
}

export default function SignUp({ params: { lang } }: SignUpProps) {
  return (
    <AuthWrapperOne
      title={
        <> 
        
        </>
      }
      description="En vous inscrivant, vous acceptez les conditions d'utilisation et la politique de confidentialité de notre plateforme."
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
      <SignUpForm lang={lang}/>
    </AuthWrapperOne>
  );
}
