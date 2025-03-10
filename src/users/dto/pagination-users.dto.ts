import {
  Pagination,
  PaginationArgs,
  PaginationSortBy,
  SortDirection,
  Omit,
} from '@/pagination/dto/pagination.dto';
import { User } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class UsersPaginationSortBy extends PaginationSortBy {
  @ApiProperty({ name: 'sortBy.role', required: false, enum: ['ASC', 'DESC'] })
  role?: SortDirection;

  @ApiProperty({ name: 'sortBy.email', required: false, enum: ['ASC', 'DESC'] })
  email?: SortDirection;

  @ApiProperty({
    name: 'sortBy.firstName',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  firstName?: SortDirection;

  @ApiProperty({
    name: 'sortBy.lastName',
    required: false,
    enum: ['ASC', 'DESC'],
  })
  lastName?: SortDirection;
}

export class PaginationUsersArgs extends PaginationArgs {
  @ApiProperty({
    name: 'sortBy',
    required: false,
    type: () => UsersPaginationSortBy,
  })
  @ValidateNested()
  sortBy?: UsersPaginationSortBy;
}

// extends User to inherit all properties from User and exclude password
export class UserOutput extends Omit(User, ['password']) {}

export class UsersPagination extends Pagination<UserOutput> {
  @ApiProperty()
  data: UserOutput[];
}
