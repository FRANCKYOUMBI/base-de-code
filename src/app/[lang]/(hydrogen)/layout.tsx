'use client';
import BerylLiumLayoutHomePage from '@/layouts/beryllium/beryllium-layout-homepage';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Fonction pour décoder le token JWT et vérifier l'expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const currentTime = Date.now() / 1000;
    return exp < currentTime;

  } catch (error) {
    console.error('Failed to decode token', error);
    return true;

  }
};

export default function DefaultLayout({

  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const isMounted = useIsMounted();
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      //@ts-ignore
      const token = session?.user?.accessToken as string;
      if (token && isTokenExpired(token)) {
        signOut()
      }
    }
  }, [session]);

  if (!isMounted) {
    return null;

  }

  return (
    <>
      {pathname.includes('admin') ? (
        <>{children}</>
      ) : (
        <BerylLiumLayoutHomePage lang={lang}>{children}</BerylLiumLayoutHomePage>
      )}
    </>
  );
}