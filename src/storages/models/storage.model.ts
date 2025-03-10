import { Node } from '@/pagination/models/node.model';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class StorageThumbnail {
  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  file_name: string;
}

@Entity({ name: 'storages' })
export class Storage extends Node {
  @ApiProperty()
  @Column('text')
  file_name: string;

  @ApiProperty()
  @Column('text')
  url: string;

  @ApiProperty()
  @Column()
  mime_type: string;

  @ApiProperty()
  @Column()
  width: number;

  @ApiProperty()
  @Column()
  height: number;

  @ApiProperty()
  @Column()
  size: number;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  caption: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  description: string;

  @ApiProperty()
  @Column({ nullable: true, default: '' })
  alternative_title: string;

  @ApiProperty()
  @Column('jsonb', { nullable: false, default: {} })
  thumbnail: StorageThumbnail;

  @ApiProperty()
  @Column('jsonb', { nullable: false, default: {} })
  medium: StorageThumbnail;
}
