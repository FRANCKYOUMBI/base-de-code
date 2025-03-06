declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export type Icon = FC<IconProps>;

  // Ajoutez ici les icônes que vous utilisez
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const Check: Icon;
  export const X: Icon;
  export const Plus: Icon;
  export const Minus: Icon;
  export const Trash2: Icon;
  // Vous pouvez ajouter d'autres icônes au besoin
}
