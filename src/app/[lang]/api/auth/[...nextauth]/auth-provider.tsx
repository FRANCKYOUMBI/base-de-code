'use client';

import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useModal } from '@/components/modal-views/use-modal';
import AuthRequiredView from '@/app/[lang]/auth/login/auth_modal';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Loader } from 'rizzui';

const AuthModalContext = createContext<{

  showAuthModal: () => void;
}>({ showAuthModal: () => { } });

export const useAuthModal = () => useContext(AuthModalContext);

function AuthStateHandler({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { openModal } = useModal();
  const searchParams = useSearchParams();
  const showAuthModal = searchParams.get('showAuthModal');
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Attendre que la session soit chargée
      if (status === 'loading') return;

      // Vérifier l'authentification et rediriger si nécessaire
      if (status === 'authenticated' && session?.user) {
        // @ts-ignore
        const token = session?.user?.accessToken as string;
        
        if (token && (pathname === '/' || pathname === '')) {
          setIsChecking(false);
          window.location.replace('/en/admin');
          return;
        }
      }

      // Gérer la modale d'authentification
      if (showAuthModal === 'true' && status === 'unauthenticated') {
        openModal({
          view: <AuthRequiredView />,
          size: 'md',
          className: 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm',
        });

        const url = new URL(window.location.href);
        url.searchParams.delete('showAuthModal');
        router.replace(url.pathname);
      }

      setIsChecking(false);
    };

    checkAuthStatus();
  }, [session, status, pathname, router, showAuthModal, openModal]);

  // Afficher le loader pendant la vérification
  if (isChecking || status === 'loading') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
        <Loader size="lg" variant="spinner" className="text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  const { openModal } = useModal();

  const showAuthModal = () => {
    openModal({
      view: <AuthRequiredView />,
      size: 'md',
      className: 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm',
    });
  };

  return (
    <SessionProvider session={session}>
      <AuthModalContext.Provider value={{ showAuthModal }}>
        <AuthStateHandler>{children}</AuthStateHandler>
      </AuthModalContext.Provider>
    </SessionProvider>
  );
}