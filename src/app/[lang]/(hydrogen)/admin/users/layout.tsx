// components/MinimalLayout.tsx
import { Permission } from '@/services/types/role-permissions';
import { PermissionGuard } from '@/ui/PermissionGuard';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <>
  <PermissionGuard requiredPermission={Permission.MANAGE_USERS}>
  {children}
  </PermissionGuard>
  </>;
};

export default Layout;