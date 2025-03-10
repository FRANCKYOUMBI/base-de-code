import { Node } from '@/pagination/models/node.model';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  RelationId,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerGroup } from '@/customers/models/customer_group.model';

@Entity({ name: 'customers' })
export class Customer extends Node {
  @Column()
  @ApiProperty()
  @Index({ fulltext: true })
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: true })
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty()
  company: string;

  @Column({ nullable: true })
  @ApiProperty()
  rccm: string;

  @Column({ nullable: true })
  @ApiProperty()
  nui: string;

  @Column({ nullable: true })
  @ApiProperty()
  address: string;

  @Column({ nullable: true })
  @ApiProperty()
  city: string;

  @Column({ nullable: true })
  @ApiProperty()
  postal: string;

  @Column({ nullable: true })
  @ApiProperty()
  country: string;

  @ManyToOne(() => CustomerGroup, (group) => group.customers, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  group: CustomerGroup;

  @RelationId((self: Customer) => self.group)
  groupUuid: CustomerGroup['uuid'];
}
