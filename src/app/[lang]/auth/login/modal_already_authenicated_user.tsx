'use client';

import { Button, Loader } from 'rizzui';
import { routes } from '@/config/routes';
import { useModal } from '@/components/modal-views/use-modal';
import { useState } from 'react';
import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type LoadingState = 'admin' | 'logout' | null;

export default function AlreadyAuthenticatedModal() {
    const router = useRouter();
    const { closeModal } = useModal();
    const [loading, setLoading] = useState<LoadingState>(null);
    const { data: session } = useSession();
    const user = session?.user as User;

    const handleNavigation = async () => {
        setLoading('admin');
        try {
            await closeModal();
            await new Promise(resolve => setTimeout(resolve, 800));
            // Utiliser router.push au lieu de window.location pour une navigation plus propre
            router.replace('/en/admin');
        } catch (error) {
            console.error('Navigation error:', error);
            setLoading(null);
        }
    };

    const handleLogout = async () => {
        setLoading('logout');
        try {
            await signOut({
                redirect: true,
                callbackUrl: routes.home
            });
            await closeModal();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(null);
        }
    };

    if (!user) return null;

    return (
        <div className="p-6 text-center">
            <h2 className="mb-4 text-2xl font-semibold">Déjà Connecté</h2>
            <p className="mb-6 text-gray-500">
                {user.email}, vous êtes déjà connecté à votre compte !
            </p>
            <div className="flex justify-center gap-4">
                <Button
                    onClick={handleNavigation}
                    className="min-w-[120px]"
                    size="lg"
                    disabled={loading !== null}
                >
                    {loading === 'admin' ? (
                        <Loader variant="spinner" />
                    ) : "Accéder"}
                </Button>

                <Button
                    onClick={handleLogout}
                    className="min-w-[120px]"
                    variant="outline"
                    size="lg"
                    disabled={loading !== null}
                >
                    {loading === 'logout' ? (
                        <Loader variant="spinner" />
                    ) : "Se déconnecter"}
                </Button>
            </div>
        </div>
    );
}