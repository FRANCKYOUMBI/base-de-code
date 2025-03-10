import { Node } from '@/pagination/models/node.model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tokens' })
export class Token extends Node {
  @Column({ unique: true })
  token: string;

  @Column({ nullable: true })
  userUuid: string;
}
