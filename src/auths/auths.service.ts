import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthInput, UpdateMeInput, UpdatePasswordInput } from './dto/auth.dto';
import { UsersService } from '@/users/users.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';
import {
  ConfirmResetPasswordInput,
  ResetPasswordInput,
  ResetPasswordOutput,
} from '@/auths/dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { MailingService } from '@/mailing/mailing.service';
import { ValidateUserInput } from '@/auths/dto/validate-user.dto';
import { User } from '@/users/models/user.model';
import { StoragesService } from '@/storages/storages.service';

export interface JWTPayload {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface validateAccountJWTPayload {
  uuid: string;
}

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailingService: MailingService,
    private readonly storageService: StoragesService,
  ) { }

  async login(authInput: AuthInput, deviceInfo?: string, ipAddress?: string) {
    const user = await this.validateUser(authInput.email, authInput.password);
    
    // Vérifier si l'utilisateur est déjà connecté sur un autre appareil
    const activeSession = await this.usersService.findActiveSessionByUserUuid(user.uuid);
    if (activeSession) {
      try {
        // Vérifier si le token JWT de la session est toujours valide
        await this.jwtService.verifyAsync(activeSession.jwtToken);
        
        // Vérifier si la session est expirée (72 heures d'inactivité)
        const sessionExpired = new Date().getTime() - activeSession.lastActivity.getTime() > 72 * 60 * 60 * 1000;
        
        if (sessionExpired) {
          // Désactiver la session expirée
          await this.usersService.deactivateSession(activeSession.uuid);
        } else if (deviceInfo && activeSession.deviceInfo !== deviceInfo) {
          throw new HttpException(
            this.i18n.t('auths.already_logged_in'),
            HttpStatus.CONFLICT,
          );
        }
      } catch (error) {
        // Si le token JWT n'est plus valide, désactiver la session
        await this.usersService.deactivateSession(activeSession.uuid);
      }
    }
    
    const payload = { sub: user.uuid, email: user.email, role: user.role };
    user.password = undefined;
    
    const jwtToken = await this.jwtService.signAsync(payload);
    
    // Créer une nouvelle session
    if (deviceInfo) {
      await this.usersService.createUserSession(user.uuid, deviceInfo, ipAddress, jwtToken);
    }
    
    return {
      token: jwtToken,
      user: user,
    };
  }

  async validateUserAccount(input: ValidateUserInput) {
    // Check if token is existed in database
    try {
      await this.usersService.findToken(input.token);
    } catch (error) {
      throw new HttpException(
        this.t('validate_account_token_invalid_or_expired'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const decodedToken = this.jwtService.decode(input.token);

    if (!decodedToken) {
      throw new HttpException(
        this.t('validate_account_token_invalid_or_expired'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const validatePayload: validateAccountJWTPayload = {
      uuid: decodedToken['uuid'],
    };
    try {
      const user = await this.usersService.findOne(validatePayload.uuid);
      user.activated = true;
      await user.save();
      await this.usersService.deleteToken(input.token);
      const payload = { sub: user.uuid, email: user.email, role: user.role };
      return {
        token: await this.jwtService.signAsync(payload),
        user: user,
      };
    } catch (error) {
      throw new HttpException(
        this.t('validate_account_token_invalid_or_expired'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      this.throwInvalidLoginCredentialsError();
    }
    if (!user.enabled) {
      this.throwInvalidLoginCredentialsError();
    }
    if (!user.activated) {
      this.throwUnverifiedAccountError();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    this.throwInvalidLoginCredentialsError();
  }

  async resetPasswordInit(
    input: ResetPasswordInput,
  ): Promise<ResetPasswordOutput> {
    const user = await this.usersService.findOneByEmail(input.email);

    if (!user) {
      throw new HttpException(
        this.t('auths.account_with_email_not_found', {
          email: input.email,
        }),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    if (!user.enabled) {
      throw new HttpException(
        this.t('auths.account_is_disabled'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    if (!user.activated) {
      throw new HttpException(
        this.t('auths.account_unverified'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const token = this.jwtService.sign(
      { uuid: user.uuid },
      { expiresIn: '4h' },
    );
    await this.usersService.createTokenWithUSer(token, user.uuid);
    const url = this.configService.get('RESET_PASSWORD_ACCOUNT_LINK') + token;

    await this.mailingService.sendMail(
      user.email,
      'Instructions pour réinitialiser votre mot de passe Adsquid',
      'mail-reset-password',
      {
        name: user.firstName || '' + ' ' + user.lastName || '',
        url: url,
        user_email: user.email,
      },
    );

    return {
      message: this.t('auths.we_have_send_a_mail_with_reset_password_link'),
    };
  }

  async confirmResetPassword(
    input: ConfirmResetPasswordInput,
  ): Promise<ResetPasswordOutput> {
    // Check if token is exist in database
    const verifyToken = this.jwtService.verify(input.token);
    if (!verifyToken) {
      throw new HttpException(
        this.t('auths.password_reset_token_invalid_or_expired'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const decodedToken = this.jwtService.decode(input.token);
    if (!decodedToken) {
      throw new HttpException(
        this.t('auths.password_reset_token_invalid_or_expired'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const user_token = this.usersService.findTokenUser(
      input.token,
      decodedToken['uuid'],
    );
    if (!user_token) {
      throw new HttpException(
        this.t('auths.password_reset_token_invalid_or_expired'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const exist_user = this.usersService.findOne(decodedToken['uuid']);
    if (!exist_user) {
      throw new HttpException(
        this.t('auths.account_not_exists'),
        HttpStatus.NOT_FOUND,
      );
    }

    if (!(await exist_user).enabled) {
      throw new HttpException(
        this.t('auths.account_is_disabled'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    if (!(await exist_user).activated) {
      throw new HttpException(
        this.t('auths.account_unverified'),
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    // Change the user password here
    const hash_password = await bcrypt.hash(input.new_password, 10);

    await this.usersService.partialUpdate(decodedToken['uuid'], {
      password: hash_password,
    });

    await this.usersService.deleteUserToken(input.token, decodedToken['uuid']);

    return {
      message: this.t('auths.successfully_reset_password'),
    };
  }

  throwInvalidLoginCredentialsError() {
    throw new HttpException(
      this.t('auths.email_or_password_invalid'),
      HttpStatus.UNAUTHORIZED,
    );
  }
  throwUnverifiedAccountError() {
    throw new HttpException(
      this.t('auths.account_unverified'),
      HttpStatus.UNAUTHORIZED,
    );
  }

  t(key, p?: { email: string }): string {
    return this.i18n.t(key, { lang: I18nContext.current().lang, args: p });
  }

  async updateMe(user: User, updateMeInput: UpdateMeInput): Promise<User> {
    if (updateMeInput.avatarUuid) {
      const storage = await this.storageService.findOne(
        updateMeInput.avatarUuid,
      );
      if (!storage) {
        throw new HttpException("L'avatar n'existe pas", HttpStatus.NOT_FOUND);
      }
      user.avatar = storage;
    }
    user.firstName = updateMeInput.firstName;
    user.lastName = updateMeInput.lastName;
    await user.save();
    return user;
  }

  async updatePassword(user: User, updatePasswordInput: UpdatePasswordInput) {
    const isMatch = await bcrypt.compare(
      updatePasswordInput.currentPassword,
      user.password,
    );
    if (!isMatch) {
      throw new HttpException(
        this.t('auths.invalid_current_password'),
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = await bcrypt.hash(updatePasswordInput.password, 10);
    await user.save();
    return {
      message: this.t('auths.password_updated'),
    };
  }

  async logout(user: User) {
    // Find and deactivate the user's active session
    await this.usersService.deactivateAllUserSessions(user.uuid);
    
    return {
      message: this.t('auths.logout_success'),
    };
  }
}
