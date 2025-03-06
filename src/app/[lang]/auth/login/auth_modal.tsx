'use client';

import { Button, Loader } from 'rizzui';
import { useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { useModal } from '@/components/modal-views/use-modal';
import { useState } from 'react';

export default function AuthRequiredView() {
  const { closeModal } = useModal();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState<'login' | 'close' | null>(null);

  const handleNavigation = async (destination: string) => {
    const action = destination === routes.signIn ? 'login' : 'close';
    setLoading(action);
    
    try {
      await closeModal();
      // Forcer un délai avant la navigation
      await new Promise(resolve => setTimeout(resolve, 800));
      window.location.href = destination;
    } catch (error) {
      console.error('Navigation error:', error);
      setLoading(null);
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="mb-4 text-2xl font-semibold">Connexion requise</h2>
      <p className="mb-6 text-gray-500">
        Vous devez être connecté pour accéder à {callbackUrl || 'cette page'}.
      </p>
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => handleNavigation(routes.signIn)}
          className="min-w-[120px]"
          type="submit"
          size="lg"
          disabled={loading !== null}
        >
          {loading === 'login' ? (
            <Loader variant="spinner" />
          ) : "Se connecter"}
        </Button>

        <Button
          onClick={() => handleNavigation(routes.home)}
          className="min-w-[120px]"
          variant="outline"
          type="submit"
          size="lg"
          disabled={loading !== null}
        >
          {loading === 'close' ? (
            <Loader variant="spinner" />
          ) : "Fermer"}
        </Button>
      </div>
    </div>
  );
}