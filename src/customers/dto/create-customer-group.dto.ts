import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerGroup } from '@/customers/models/customer_group.model';

export class CreateCustomerGroupInput {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description: string;
}

export class CreateCustomerGroupOutput {
  @ApiProperty()
  customerGroup: CustomerGroup;
}
