import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotificationsPagination,
  PaginationNotificationsArgs,
} from '@/notifications/dto/pagniation-notification.dto';
import { Notification } from '@/notifications/models/notifications.model';
import { User } from '@/users/models/user.model';
import { CreateNotificationInput } from '@/notifications/dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async findOne(uuid: Notification['uuid']): Promise<Notification> {
    return this.notificationRepository.findOne({ where: { uuid } });
  }

  async createNotification(
    createNotificationInput: CreateNotificationInput,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...createNotificationInput,
    });
    notification.user = new User();
    notification.user.uuid = createNotificationInput.userUuid;

    await this.notificationRepository.save(notification);
    return this.findOne(notification.uuid);
  }

  async getNotificationsList(
    args: PaginationNotificationsArgs,
    user: User,
  ): Promise<NotificationsPagination> {
    const qb = this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect(
        'notification.notificationStocks',
        'notificationStocks',
      )
      .leftJoinAndSelect('notificationStocks.stock', 'stock')
      .leftJoinAndSelect('stock.product', 'product')
      .leftJoinAndSelect('stock.productUnit', 'productUnit')
      .leftJoinAndSelect('productUnit.unit', 'unit');
    qb.where('notification.userUuid = :userUuid', { userUuid: user.uuid });
    if (args.type) {
      qb.andWhere('notification.type = :type', { type: args.type });
    }

    if (args.sortBy) {
      if (args.sortBy.createdAt != null) {
        qb.addOrderBy(
          'notification.createdAt',
          args.sortBy.createdAt.toString() === 'ASC' ? 'ASC' : 'DESC',
        );
      }
    } else {
      qb.orderBy('notification.createdAt', 'DESC');
    }
    qb.take(args.take);
    qb.skip(args.skip);

    const [nodes, totalCount] = await qb.getManyAndCount();

    return { data: nodes, totalCount };
  }
}
