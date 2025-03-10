import { Storage } from '../models/storage.model';
import { ApiProperty } from '@nestjs/swagger';

export class StorageDeleteOutput {
  @ApiProperty()
  uuid: Storage['uuid'];
}
