'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { siteConfig } from './site.config';
import hideRechartsConsoleError from '@/ui/recharts-console-error';

hideRechartsConsoleError();

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}
    >
      {children}
    </NextThemeProvider>
  );
}
