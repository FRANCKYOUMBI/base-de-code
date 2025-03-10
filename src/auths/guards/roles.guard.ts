import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@/users/models/role.model';
import { ROLES_KEY } from '@/auths/decorators/roles.decorator';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const haveAbility = requiredRoles.includes(user.role);
    if (!haveAbility) {
      throw new HttpException(
        this.i18n.t('auths.unauthorized', {
          lang: I18nContext.current().lang,
        }),
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}
