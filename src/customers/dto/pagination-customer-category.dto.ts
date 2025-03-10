import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
} from '@/pagination/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { CustomerGroup } from '@/customers/models/customer_group.model';

export class CustomerGroupsPaginationSortBy extends PaginationSortBy {
  @ApiProperty({
    name: 'sortBy.name',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  name?: SortDirection;
}

export class PaginationCustomerGroupsArgs extends PaginationArgs {
  @ApiProperty({
    name: 'sortBy',
    required: false,
    type: () => CustomerGroupsPaginationSortBy,
  })
  @ValidateNested()
  sortBy?: CustomerGroupsPaginationSortBy;
}

export class CustomerGroupsPagination extends Pagination<CustomerGroup> {
  @ApiProperty()
  data: CustomerGroup[];
}
