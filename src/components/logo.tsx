import Image from 'next/image';
import logoImg from '@public/logo-primary.svg';
import logoImgText from '@public/logo-primary-text.svg';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false}: IconProps) {

  return (
      <div className={`flex ${iconOnly? 'w-12 h-8' : 'w-40 h-8'}`}>
        <Image src={logoImg} alt="PS" className={'h-full'} />
        {!iconOnly && (<Image
          src={logoImgText}
          alt="Pos Suite"
          className="ps-2.5 dark:invert h-full"/>)}
      </div>
  )
}
