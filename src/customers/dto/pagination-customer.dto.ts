import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from '@/pagination/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Customer } from '@/customers/models/customer.model';

export class CustomersPaginationSortBy extends PaginationSortBy {
  @ApiProperty({
    name: 'sortBy.name',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  name?: SortDirection;
}

export class PaginationCustomersArgs extends PaginationArgs {
  @ApiProperty({
    name: 'sortBy',
    required: false,
    type: () => CustomersPaginationSortBy,
  })
  @ValidateNested()
  sortBy?: CustomersPaginationSortBy;

  @ApiProperty({ required: false })
  groupUuid?: string;
}

export class CustomersPagination extends Pagination<Customer> {
  @ApiProperty()
  data: Customer[];
}
