import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '@/users/models/role.model';

export class ListRolesOutput {
  @ApiProperty()
  roles: Roles[];
}
