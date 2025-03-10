import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from '@/pagination/dto/pagination.dto';
import { Storage } from '../models/storage.model';
import { ApiProperty } from '@nestjs/swagger';

export class StoragesPaginationSortBy extends PaginationSortBy {
  @ApiProperty()
  file_name?: SortDirection;

  @ApiProperty()
  url?: SortDirection;

  @ApiProperty()
  caption?: SortDirection;

  @ApiProperty()
  description?: SortDirection;

  @ApiProperty()
  alternative_title?: SortDirection;
}

export class StoragesPaginationArgs extends PaginationArgs {
  @ApiProperty()
  sortBy?: StoragesPaginationSortBy;

  @ApiProperty()
  filterByMimeType?: [string];
}

export class StoragesPagination extends Pagination {
  @ApiProperty()
  data: Storage[];
}
