import { Node } from '../models/node.model';
import { ApiProperty } from '@nestjs/swagger';
// import { IsNumber, IsString } from 'class-validator';

export const Omit = <T, K extends keyof T>(
  Class: new () => T,
  keys: K[],
): new () => Omit<T, (typeof keys)[number]> => Class;

export enum SortDirection {
  ASC,
  DESC,
}

export class PaginationSortBy {
  @ApiProperty({ required: false, enum: SortDirection })
  createdAt?: SortDirection;
}

export class PaginationArgs {
  @ApiProperty()
  // @IsNumber()
  skip: number;

  @ApiProperty()
  // @IsNumber()
  take: number;

  @ApiProperty({ required: false })
  // @IsString()
  keyword?: string;
}

export abstract class Pagination<N extends Node = Node> {
  @ApiProperty()
  totalCount: number;

  abstract data: N[];
}
