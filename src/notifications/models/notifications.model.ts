import { Node } from '@/pagination/models/node.model';
import {
  Column,
  // CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from '@/users/models/user.model';
import { ApiProperty } from '@nestjs/swagger';
// import { Stock } from '@/products/models/stock.model';

export enum NotificationType {
  STOCK_ALERT = 'STOCK_ALERT',
}

@Entity({ name: 'notifications' })
export class Notification extends Node {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  uuid: string;

  @Column({ type: 'enum', enum: NotificationType })
  @ApiProperty()
  type: NotificationType;

  @Column({ type: 'jsonb' })
  @ApiProperty()
  data: any;

  @Column({ default: false })
  @ApiProperty()
  isRead: boolean;

  // @CreateDateColumn()
  // createdAt: Date;

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: User;

  @RelationId((self: Notification) => self.user)
  userUuid: User['uuid'];

  //   @OneToMany(() => NotificationStock, (product) => product.notification)
  //   @ApiProperty({ type: () => NotificationStock, isArray: true })
  //   notificationStocks: NotificationStock[];
  // }

  // @Entity({ name: 'notification_stocks' })
  // export class NotificationStock {
  //   @PrimaryGeneratedColumn('uuid')
  //   @ApiProperty()
  //   uuid: string;

  @ManyToOne(() => Notification, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  notification: Notification;

  // @RelationId((self: NotificationStock) => self.notification)
  // notificationUuid: Notification['uuid'];

  // @ManyToOne(() => Stock, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn()
  // stock: Stock;

  // @RelationId((self: NotificationStock) => self.stock)
  // stockUuid: Stock['uuid'];
}
