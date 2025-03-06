// components/PermissionGuard.tsx
'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Permission, Role, rolePermissions } from '@/services/types/role-permissions';
import { User } from '@/services/types/user';
import { useRouter } from 'next/navigation';

interface PermissionGuardProps {
  requiredPermission: Permission;
  children: React.ReactNode; // Ajout des enfants pour permettre l'affichage du contenu si l'autorisation est valide

}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ requiredPermission,children  }) => {
  const router = useRouter();
  const { data } = useSession();
  const user: User = data?.user as User;
  const userRole = user?.role as Role; 
  const userPermissions = rolePermissions[userRole] || [];


  useEffect(() => {
    // Vérifie si l'utilisateur a la permission requise
    if (!userPermissions.includes(requiredPermission)) {
      router.replace('/access-denied'); // Redirige vers la page "accès refusé"
    }
  }, [requiredPermission, userPermissions, router]);

  // Si l'utilisateur n'a pas la permission requise, ne rien afficher
  if (!userPermissions.includes(requiredPermission)) {
    return null;
  }

  return children;
};


