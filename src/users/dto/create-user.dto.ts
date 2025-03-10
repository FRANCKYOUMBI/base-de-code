import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { Roles } from '../models/role.model';
import { User } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated/i18n.generated';

export class CreateUserInput {
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
  @IsOptional()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: i18nValidationMessage<I18nTranslations>('validation.password'),
    },
  )
  @ApiProperty({ nullable: true })
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

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.role_is_required',
    ),
  })
  @IsEnum(Roles, {
    message: i18nValidationMessage<I18nTranslations>('validation.role_must_be'),
  })
  @ApiProperty({ enum: Roles, example: Roles.sales })
  role: Roles;

  @IsBoolean()
  @ApiProperty()
  activated: boolean;
}

export class CreateUserOutput {
  @ApiProperty()
  user: User;
}
