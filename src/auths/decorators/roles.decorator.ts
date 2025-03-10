import { SetMetadata } from '@nestjs/common';
import { Roles } from '@/users/models/role.model';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...roles: Roles[]) =>
  SetMetadata(ROLES_KEY, roles);
