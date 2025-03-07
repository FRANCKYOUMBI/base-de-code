'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useModal } from '@/components/modal-views/use-modal';
import AuthRequiredView from '@/app/[lang]/auth/login/auth_modal';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Loader } from 'rizzui';
import AlreadyAuthenticatedModal from '@/app/[lang]/auth/login/modal_already_authenicated_user';
import LoginModalView from '@/app/[lang]/auth/login/login_modal';

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
      if (status === 'loading') return;

      // Vérifier si on est sur la page de login
      if (pathname.includes('/auth/login')) {
        setIsChecking(false);
        return;
      }

      if (status === 'authenticated' && session?.user) {
        // @ts-ignore
        const token = session?.user?.accessToken as string;
        if (token && (pathname === '/' || pathname === '')) {
          setIsChecking(false);
          window.location.replace('/en/admin');
          return;
        }
      }

      // Ne montrer AuthRequiredView que si on n'est pas sur la page de login
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
  return (
    <SessionProvider session={session}>
      <AuthModalWrapper>{children}</AuthModalWrapper>
    </SessionProvider>
  );
}

function AuthModalWrapper({ children }: { children: React.ReactNode }) {
  const { openModal } = useModal();
  const { data: currentSession, status } = useSession();
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'fr'; // Extrait la langue du chemin

  const showAuthModal = () => {
    // @ts-ignore
    if (status === 'authenticated' && currentSession?.user?.accessToken) {
      openModal({
        view: <AlreadyAuthenticatedModal />,
        size: 'md',
        className: 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm',
      });
    } else {
      openModal({
        view: <LoginModalView params={{ lang }} />,
        size: 'md',
        className: 'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm',
      });
    }
  };

  return (
    <AuthModalContext.Provider value={{ showAuthModal }}>
      <AuthStateHandler>{children}</AuthStateHandler>
    </AuthModalContext.Provider>
  );
}