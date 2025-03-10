import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';
import { I18nTranslations } from '@/generated/i18n.generated';

export class ValidateUserInput {
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.token_is_required',
    ),
  })
  @ApiProperty()
  token: string;
}
