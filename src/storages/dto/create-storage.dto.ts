import { IsNotEmpty } from 'class-validator';
import { Storage } from '../models/storage.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStorageInput {
  @IsNotEmpty({ message: 'Le nom du fichier ne peut être vide' })
  @ApiProperty()
  file_name: string;

  @IsNotEmpty({ message: 'Le contenu du fichier ne peut être vide' })
  @ApiProperty()
  base_64: string;

  @ApiProperty()
  caption?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  alternative_title?: string;

  @ApiProperty()
  compress?: boolean;
}

export class CreateRestStorageInput {
  @ApiProperty()
  file_name: string;

  @ApiProperty()
  base_64: string;
}

export class CreateStorageOutput {
  @ApiProperty()
  storage: Storage;
}
