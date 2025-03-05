'use client';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in');
      return;
    }

    if (session) {
      //@ts-ignore
      const token = session?.user?.accessToken as string;
      if (!token || isTokenExpired(token)) {
        signOut({ callbackUrl: '/auth/sign-in' });
      }
    }
  }, [session, status, router]);

  if (!isMounted || status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <BerylLiumLayout lang={lang}>{children}</BerylLiumLayout>;
}