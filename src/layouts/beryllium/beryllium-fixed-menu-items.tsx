import { routes } from '@/config/routes';
import { IconType } from 'react-icons/lib';
// eslint-disable-next-line no-duplicate-imports
import {
  LuAirplay,
  LuFolderKey, LuLayoutDashboard, LuSettings,

} from "react-icons/lu";

import { atom, useAtom } from 'jotai';
import { Permission, rolePermissions } from '@/services/types/role-permissions';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  isCurrent: (pathname: string) => boolean;
  badge?: string;
  requiredPermission?: Permission; // Ajoutez cette ligne
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  isCurrent: (pathname: string) => boolean;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
  requiredPermission?: Permission; // Ajoutez cette ligne
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
  requiredPermission?: Permission; // Ajoutez cette ligne

}

const matchRoute = (pathname: string, routeGenerator: (uuid: string) => string, uuidRegex: RegExp): boolean => {
  // Extract the last part of the pathname (assuming UUID is the last segment)
  const pathSegments = pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const beforeLastSegment = pathSegments.length > 2 ? pathSegments[pathSegments.length - 2] : null;

  // Check if the last segment matches the UUID regex
  if (!uuidRegex.test(lastSegment) && !uuidRegex.test(beforeLastSegment ?? "")) {
    return false;
  }
  // Generate the route using the UUID
  const expectedRoute = uuidRegex.test(lastSegment) ? routeGenerator(lastSegment) : routeGenerator(beforeLastSegment ?? "");

  // Compare the generated route with the original pathname
  return pathname === expectedRoute || pathname === "/fr" + expectedRoute;
}

// Example usage:
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const berylliumMenuItems: MenuItemsType[] = [
  {
    id: "1",
    name: "Accueil",
    title: "Tableau de bord",
    icon: LuAirplay,
    menuItems: [
      {
        name: "Tableau de bord",
        href: routes.admin,
        icon: LuLayoutDashboard,
        isCurrent: (pathname: string) => {
          return pathname === routes.admin || pathname === "/fr" + routes.admin;
        },
      },
    ],
  },
  {
    id: "5",
    name: "Configs",
    title: "configuration",
    icon: LuSettings,
    requiredPermission: Permission.CONFIGURE_SETTINGS, // Seuls les rôles avec MANAGE_USERS peuvent accéder
    menuItems: [
      {
        name: "Comptes utilisateurs",
        icon: LuFolderKey,
        requiredPermission: Permission.MANAGE_USERS, // Seuls les rôles avec MANAGE_USERS peuvent accéder
        subMenuItems: [
          {
            name: "Liste des utilisateurs",
            href: routes.users.listing,
            isCurrent: (pathname: string) => {
              return pathname === routes.users.listing || pathname === "/fr" + routes.users.listing ||
                matchRoute(pathname, routes.users.detailUser, uuidPattern) ||
                matchRoute(pathname, routes.users.edit, uuidPattern);
            }
          },
          {
            name: "Ajouter un utilisateur",
            href: routes.users.create,
            isCurrent: (pathname: string) => {
              return pathname === routes.users.create || pathname === "/fr" + routes.users.create
            }
          },
        ],
        isCurrent: function (pathname: string): boolean {
          throw new Error('Function not implemented.');
        }
      },
    ],
  },

];
export const berylliumMenuItemAtom = atom(berylliumMenuItems[0]);
