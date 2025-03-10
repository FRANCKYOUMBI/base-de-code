import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotificationsPagination,
  PaginationNotificationsArgs,
} from '@/notifications/dto/pagniation-notification.dto';
import { NotificationsService } from '@/notifications/notifications.service';

@Controller('notifications')
@ApiTags('notifications')
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiOkResponse({
    type: NotificationsPagination,
    description: 'Notifications list',
  })
  @HttpCode(HttpStatus.OK)
  async getNotifications(
    @Request() req,
    @Query() args: PaginationNotificationsArgs,
  ): Promise<NotificationsPagination> {
    return await this.notificationsService.getNotificationsList(args, req.user);
  }
}
