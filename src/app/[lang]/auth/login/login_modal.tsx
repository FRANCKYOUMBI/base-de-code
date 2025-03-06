'use client';

import { useModal } from '@/components/modal-views/use-modal';
import SignInForm from './sign-in-form';
import UnderlineShape from '@/components/shape/underline';

export default function LoginModalView() {
    //   const { closeModal } = useModal();
    return (
        <div className="relative p-6">
            <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-semibold">
                    Bienvenue sur{' '}
                    <span className="relative inline-block">
                        Pos Suite
                        <UnderlineShape className="absolute -bottom-1 start-0 h-2 w-24 text-primary" />
                    </span>
                </h2>
                <p className="text-sm text-gray-500">
                    Connectez-vous pour accéder à votre compte
                </p>
            </div>

            <div className="flex">
                <div className="w-full max-w-[400px] mx-auto">
                    <SignInForm lang="fr" />
                </div>
            </div>
        </div>
    );
}