import { IsNotEmpty } from 'class-validator';
import { Storage } from '../models/storage.model';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/generated/i18n.generated';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStorageInput {
  // @IsNotEmpty({
  //   message: i18nValidationMessage<I18nTranslations>(
  //     'validation.file_name_is_required',
  //   ),
  // })
  @ApiProperty()
  file_name: string;

  @ApiProperty()
  caption: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  alternative_title: string;
}

export class UpdateStorageOutput {
  @ApiProperty()
  storage: Storage;
}
