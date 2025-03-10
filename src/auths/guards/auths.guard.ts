import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@/auths/decorators/public.decorator';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException(
        this.i18n.t('auths.unauthenticated', {
          lang: I18nContext.current().lang,
        }),
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request['user'] = await this.usersService.findOne(payload.sub);
    } catch {
      throw new HttpException(
        this.i18n.t('auths.unauthenticated', {
          lang: I18nContext.current().lang,
        }),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
