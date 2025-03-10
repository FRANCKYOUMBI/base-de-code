import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated/i18n.generated';
import { ApiProperty } from '@nestjs/swagger';

export class AuthInput {
  @IsEmail(
    {},
    { message: i18nValidationMessage<I18nTranslations>('validation.email') },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.email_is_required',
    ),
  })
  @ApiProperty()
  email: string;

  // Add match for one uppercase, one lowercase, one number, one special character, and at least 8 characters
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: i18nValidationMessage<I18nTranslations>('validation.password'),
    },
  )
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.password_is_required',
    ),
  })
  @ApiProperty()
  password: string;
}

export class UpdateMeInput {
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.first_name_is_required',
    ),
  })
  @ApiProperty()
  firstName: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.last_name_is_required',
    ),
  })
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  avatarUuid?: string;
}

export class UpdatePasswordInput {
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.current_password_is_required',
    ),
  })
  @ApiProperty()
  currentPassword: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.password_is_required',
    ),
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: i18nValidationMessage<I18nTranslations>('validation.password'),
    },
  )
  @ApiProperty()
  password: string;
}

export class UpdatePasswordOutput {
  @ApiProperty()
  message: string;
}
