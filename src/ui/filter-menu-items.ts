import { MenuItemsType, SubMenuItemType, ItemType } from '@/layouts/beryllium/beryllium-fixed-menu-items';
import { Permission } from '@/services/types/role-permissions';

// Fonction récursive pour filtrer les éléments en fonction des permissions
const filterItemsByPermissions = (items: (MenuItemsType | ItemType | SubMenuItemType)[], userPermissions: Permission[]): any[] => {
  return items
    .filter((item) => {
      // Si l'élément n'a pas de permission requise, il est inclus
      if (typeof item.requiredPermission === "undefined") {
        return true;
      }
      // Sinon, vérifiez si l'utilisateur a la permission requise
      return userPermissions.includes(item.requiredPermission);
    })
    .map((item) => {
      // Si l'élément a des sous-éléments, appliquez la fonction récursivement
      if ('menuItems' in item && item.menuItems) {
        return {
          ...item,
          menuItems: filterItemsByPermissions(item.menuItems, userPermissions),
        };
      }
      if ('subMenuItems' in item && item.subMenuItems) {
        return {
          ...item,
          subMenuItems: filterItemsByPermissions(item.subMenuItems, userPermissions),
        };
      }
      return item;
    })
    .filter((item) => {
      // Supprimez les éléments vides (sans sous-éléments)
      if ('menuItems' in item) {
        return item.menuItems.length > 0;
      }
      if ('subMenuItems' in item) {
        return item.subMenuItems??[].length > 0;
      }
      return true;
    });
};

export const filterMenuItemsByPermissions = (
  menuItems: MenuItemsType[],
  userPermissions: Permission[]
): MenuItemsType[] => {
  return filterItemsByPermissions(menuItems, userPermissions) as MenuItemsType[];
};