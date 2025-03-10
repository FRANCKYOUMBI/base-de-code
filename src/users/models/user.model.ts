import { Node } from '@/pagination/models/node.model';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { Roles } from './role.model';
import { Storage } from '@/storages/models/storage.model';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'users' })
export class User extends Node {
  @Index({ fulltext: true })
  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  password: string;

  @Index({ fulltext: true })
  @Column()
  @ApiProperty()
  firstName: string;

  @Index({ fulltext: true })
  @Column()
  @ApiProperty()
  lastName: string;

  @Column('boolean', { default: false })
  @ApiProperty()
  activated: boolean;

  @Column('boolean', { default: false })
  @ApiProperty()
  enableStaffPin: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  staffPin: string;

  @Column('boolean', { default: true })
  @ApiProperty()
  enabled: boolean;

  @Column({ default: Roles.sales })
  @ApiProperty()
  role: string;

  @OneToOne(() => Storage, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  @ApiProperty()
  avatar: Storage;

  @RelationId((self: User) => self.avatar)
  // @ApiProperty()
  avatarUuid: Storage['uuid'];
}
