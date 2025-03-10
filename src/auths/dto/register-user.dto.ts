import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated/i18n.generated';
// import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterUserInput {
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
}

export class RegisterUserOutput {
  @ApiProperty()
  message: string;
}
