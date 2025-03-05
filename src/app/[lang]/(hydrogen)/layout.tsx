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

// Logique vérifiant le token de l'utilisateur s'il existe ou pas
// si le token existe, on lui affiche directement son interface
// si aucun token n'existe alors on lui retourne la page daccueil de l'application


// 'use client';
// import BerylLiumLayoutHomePage from '@/layouts/beryllium/beryllium-layout-homepage';
// import { useIsMounted } from '@/hooks/use-is-mounted';
// import { useSession, signOut } from 'next-auth/react';
// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Loader } from 'rizzui';

// // Fonction pour décoder le token JWT et vérifier l'expiration
// const isTokenExpired = (token: string): boolean => {
//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const exp = payload.exp;
//     const currentTime = Date.now() / 1000;
//     return exp < currentTime;

//   } catch (error) {
//     console.error('Failed to decode token', error);
//     return true;

//   }
// };

// export default function DefaultLayout({
//   children,
//   params: { lang },
// }: {
//   children: React.ReactNode;
//   params: {
//     lang: string;
//   };
// }) {
//   const isMounted = useIsMounted();
//   const pathname = usePathname();
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       if (status === 'loading') return;

//       if (session?.user) {
//         // @ts-ignore
//         const token = session?.user?.accessToken as string;
//         if (token) {
//           if (isTokenExpired(token)) {
//             await signOut();
//             setIsChecking(false);
//             return;
//           }

//           if (pathname === '/' || pathname === `/${lang}`) {
//             router.replace(`/${lang}/admin`);
//             return;
//           }
//         }
//       }
//       setIsChecking(false);
//     };

//     checkAuthStatus();
//   }, [session, status, pathname, lang, router]);

//   if (!isMounted || status === 'loading' || isChecking) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
//         <Loader size="lg" variant="spinner" className="text-primary" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {pathname.includes('admin') ? (
//         <>{children}</>
//       ) : (
//         <BerylLiumLayoutHomePage lang={lang}>{children}</BerylLiumLayoutHomePage>
//       )}
//     </>
//   );
// }
