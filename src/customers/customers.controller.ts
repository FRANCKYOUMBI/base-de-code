import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequiredRoles } from '@/auths/decorators/roles.decorator';
import { Roles } from '@/users/models/role.model';
import { ValidationPipe } from '@/core/pipes/validation.pipe';
import { CustomersService } from '@/customers/customers.service';
import {
  CreateCustomerInput,
  CreateCustomerOutput,
} from '@/customers/dto/create-customer.dto';
import {
  CreateCustomerGroupInput,
  CreateCustomerGroupOutput,
} from '@/customers/dto/create-customer-group.dto';
import {
  CustomersPagination,
  PaginationCustomersArgs,
} from '@/customers/dto/pagination-customer.dto';
import {
  CustomerGroupsPagination,
  PaginationCustomerGroupsArgs,
} from '@/customers/dto/pagination-customer-category.dto';

@Controller('customers')
@ApiTags('customers')
@ApiBearerAuth()

export class CustomersController {
  // constructor(private readonly customersService: CustomersService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get customers' })
  // @ApiOkResponse({ type: CustomersPagination, description: 'Customers list' })
  // @HttpCode(HttpStatus.OK)
  // @UsePipes(new ValidationPipe())
  // getCustomers(
  //   @Query() args: PaginationCustomersArgs,
  // ): Promise<CustomersPagination> {
  //   return this.customersService.findCustomers(args);
  // }

  // @Post()
  // @ApiOperation({ summary: 'Create new customer' })
  // @ApiCreatedResponse({
  //   type: CreateCustomerOutput,
  //   description: 'Customer created successfully',
  // })
  // @RequiredRoles(Roles.admin, Roles.manager, Roles.sales)
  // @UsePipes(new ValidationPipe())
  // createCustomer(
  //   @Body() createCustomerInput: CreateCustomerInput,
  // ): Promise<CreateCustomerOutput> {
  //   return this.customersService.createCustomer(createCustomerInput);
  // }

  // @Put('/:uuid')
  // @ApiOperation({ summary: 'Update customer' })
  // @ApiOkResponse({
  //   type: CreateCustomerOutput,
  //   description: 'Customer updated successfully',
  // })
  // @RequiredRoles(Roles.admin, Roles.manager, Roles.sales)
  // @UsePipes(new ValidationPipe())
  // updateCustomer(
  //   @Param('uuid') uuid: string,
  //   @Body() updateCustomerInput: CreateCustomerInput,
  // ): Promise<CreateCustomerOutput> {
  //   return this.customersService.updateCustomer(uuid, updateCustomerInput);
  // }

  // @Delete('/:uuid')
  // @ApiOperation({ summary: 'Delete customer' })
  // @ApiNoContentResponse({ description: 'Customer deleted successfully' })
  // @RequiredRoles(Roles.admin, Roles.manager)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteCustomer(@Param('uuid') uuid: string): Promise<void> {
  //   return this.customersService.deleteCustomer(uuid);
  // }

  // @Get('/groups')
  // @ApiOperation({ summary: 'Get customer groups' })
  // @ApiOkResponse({
  //   type: CustomerGroupsPagination,
  //   description: 'Customer groups list',
  // })
  // @HttpCode(HttpStatus.OK)
  // @UsePipes(new ValidationPipe())
  // getCustomerGroups(
  //   @Query() args: PaginationCustomerGroupsArgs,
  // ): Promise<CustomerGroupsPagination> {
  //   return this.customersService.findCustomerGroups(args);
  // }

  // @Post('/groups')
  // @ApiOperation({ summary: 'Create new customer group' })
  // @ApiCreatedResponse({
  //   type: CreateCustomerGroupOutput,
  //   description: 'Customer group created successfully',
  // })
  // @RequiredRoles(Roles.admin, Roles.manager)
  // @UsePipes(new ValidationPipe())
  // createCustomerGroup(
  //   @Body() createCustomerGroupInput: CreateCustomerGroupInput,
  // ): Promise<CreateCustomerGroupOutput> {
  //   return this.customersService.createCustomerGroup(createCustomerGroupInput);
  // }

  // @Put('/groups/:uuid')
  // @ApiOperation({ summary: 'Update customer group' })
  // @ApiOkResponse({
  //   type: CreateCustomerGroupOutput,
  //   description: 'Customer group updated successfully',
  // })
  // @RequiredRoles(Roles.admin, Roles.manager)
  // @UsePipes(new ValidationPipe())
  // updateCustomerGroup(
  //   @Param('uuid') uuid: string,
  //   @Body() updateCustomerGroupInput: CreateCustomerGroupInput,
  // ): Promise<CreateCustomerGroupOutput> {
  //   return this.customersService.updateCustomerGroup(
  //     uuid,
  //     updateCustomerGroupInput,
  //   );
  // }

  // @Delete('/groups/:uuid')
  // @ApiOperation({ summary: 'Delete customer group' })
  // @ApiNoContentResponse({ description: 'Customer group deleted successfully' })
  // @RequiredRoles(Roles.admin, Roles.manager)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // deleteCustomerGroup(@Param('uuid') uuid: string): Promise<void> {
  //   return this.customersService.deleteCustomerGroup(uuid);
  // }

  // @Get('/:uuid')
  // @ApiOperation({ summary: 'Get customer' })
  // @ApiOkResponse({ type: CreateCustomerOutput, description: 'Customer detail' })
  // @HttpCode(HttpStatus.OK)
  // @UsePipes(new ValidationPipe())
  // getCustomer(@Param('uuid') uuid: string): Promise<CreateCustomerOutput> {
  //   return this.customersService.findOneCustomer(uuid);
  // }

  // @Get('/groups/:uuid')
  // @ApiOperation({ summary: 'Get customer group' })
  // @ApiOkResponse({
  //   type: CreateCustomerGroupOutput,
  //   description: 'Customer group detail',
  // })
  // @HttpCode(HttpStatus.OK)
  // @UsePipes(new ValidationPipe())
  // getCustomerGroup(
  //   @Param('uuid') uuid: string,
  // ): Promise<CreateCustomerGroupOutput> {
  //   return this.customersService.findOneCustomerGroup(uuid);
  // }
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ZWU4NDY0YS0wYThiLTRmMzYtOTkzNC1hY2VjNTNlZjhhZmYiLCJlbWFpbCI6IndhbWJha2V2aW43QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMTQyMjY4OCwiZXhwIjoxNzM0MDE0Njg4fQ.DixgNUHdLSEFWllLQJrkhJfpNCBaPyMKjcFlaSx-Zfw
