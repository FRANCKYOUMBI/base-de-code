import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@/notifications/models/notifications.model';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateNotificationInput {
  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;

  @ApiProperty()
  @IsUUID()
  userUuid: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({
    type: 'object',
    properties: {
      kley: {
        type: 'string',
        example: 'value',
      },
      anotherKey: {
        type: 'number',
        example: 400,
      },
    },
    description: 'A JSON object storing key-value pairs',
    example: { key: 'value' },
  })
  data: Record<string, any>;
}
