import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Customer } from '@/customers/models/customer.model';

export class CreateCustomerInput {
  @ApiHideProperty()
  uuid?: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email: string;

  @IsOptional()
  @ApiProperty({ required: false })
  phone: string;

  @IsOptional()
  @ApiProperty({ required: false })
  company: string;

  @IsOptional()
  @ApiProperty({ required: false })
  rccm: string;

  @IsOptional()
  @ApiProperty({ required: false })
  nui: string;

  @IsOptional()
  @ApiProperty({ required: false })
  address: string;

  @IsOptional()
  @ApiProperty({ required: false })
  city: string;

  @IsOptional()
  @ApiProperty({ required: false })
  postal: string;

  @IsOptional()
  @ApiProperty({ required: false })
  country: string;

  @IsNotEmpty()
  @ApiProperty()
  groupUuid: string;
}

export class CreateCustomerOutput {
  @ApiProperty()
  customer: Customer;
}
