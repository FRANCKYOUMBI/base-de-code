import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthsService } from '@/auths/auths.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { User } from '@/users/models/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authsService: AuthsService,
    private readonly i18n: I18nService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authsService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        this.i18n.t('auths.email_or_password_invalid', {
          lang: I18nContext.current().lang,
        }),
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
