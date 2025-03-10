import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';
import { I18nTranslations } from '@/generated/i18n.generated';

export class ResetPasswordInput {
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
}

export class ConfirmResetPasswordInput {
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.token_is_required',
    ),
  })
  @ApiProperty()
  token: string;

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
  new_password: string;
}

export class ResetPasswordOutput {
  @ApiProperty()
  message: string;
}
