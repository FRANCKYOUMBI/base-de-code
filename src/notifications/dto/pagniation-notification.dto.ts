import { ApiProperty } from '@nestjs/swagger';
import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
} from '@/pagination/dto/pagination.dto';
import { ValidateNested } from 'class-validator';
import {
  Notification,
  NotificationType,
} from '@/notifications/models/notifications.model';

export class PaginationNotificationsArgs extends PaginationArgs {
  @ApiProperty({
    name: 'sortBy',
    required: false,
    type: () => PaginationSortBy,
  })
  @ValidateNested()
  sortBy?: PaginationSortBy;

  @ApiProperty({ required: false, name: 'type', enum: NotificationType })
  type?: NotificationType;
}

export class NotificationsPagination extends Pagination<Notification> {
  @ApiProperty()
  data: Notification[];
}
