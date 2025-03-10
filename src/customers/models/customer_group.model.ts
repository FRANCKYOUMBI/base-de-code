import { Node } from '@/pagination/models/node.model';
import { Entity, Column, OneToMany, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@/customers/models/customer.model';

@Entity({ name: 'customer_groups' })
export class CustomerGroup extends Node {
  @Column()
  @ApiProperty()
  @Index({ fulltext: true })
  name: string;

  @Column({ default: '' })
  @ApiProperty()
  description: string;

  @OneToMany(() => Customer, (customer) => customer.group)
  customers: Customer[];
}
