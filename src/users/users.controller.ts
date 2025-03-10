import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserInput, CreateUserOutput } from '@/users/dto/create-user.dto';
import { ListRolesOutput } from '@/users/dto/list-roles.dto';
import { Roles } from '@/users/models/role.model';
import { RequiredRoles } from '@/auths/decorators/roles.decorator';
import {
  PaginationUsersArgs,
  UsersPagination,
} from '@/users/dto/pagination-users.dto';
import { ValidationPipe } from '@/core/pipes/validation.pipe';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: UsersPagination, description: 'Users list' })
  @HttpCode(HttpStatus.OK)
  @RequiredRoles(Roles.admin, Roles.manager)
  @UsePipes(new ValidationPipe())
  getUsers(@Query() args: PaginationUsersArgs): Promise<UsersPagination> {
    console.log({ args });
    return this.usersService.findAll(args);
  }

  @Get('/roles')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiOkResponse({ type: ListRolesOutput, description: 'Roles list' })
  @HttpCode(HttpStatus.OK)
  getRoles(): ListRolesOutput {
    return this.usersService.getRoles();
  }

  @Get('/:uuid')
  @ApiOperation({ summary: 'Get user by uuid' })
  @ApiOkResponse({ type: CreateUserOutput, description: 'User' })
  @HttpCode(HttpStatus.OK)
  @RequiredRoles(Roles.admin, Roles.manager)
  getUser(@Param('uuid') uuid: string): Promise<CreateUserOutput> {
    return this.usersService.findOneUser(uuid);
  }

  @Post('')
  @ApiOperation({ summary: 'Create new user account' })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiCreatedResponse({ type: CreateUserOutput, description: 'User created' })
  @RequiredRoles(Roles.admin)
  create(@Body() createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    return this.usersService.create(createUserInput);
  }

  @Put('/:uuid')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: CreateUserOutput, description: 'User updated' })
  @RequiredRoles(Roles.admin)
  @UsePipes(new ValidationPipe())
  updateUser(
    @Body() createUserInput: CreateUserInput,
    @Param('uuid') uuid: string,
  ): Promise<CreateUserOutput> {
    return this.usersService.updateUser(uuid, createUserInput);
  }

  @Delete('/:uuid')
  @ApiOperation({ summary: 'Delete user by uuid' })
  @ApiOkResponse({ description: 'User deleted' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiredRoles(Roles.admin)
  deleteUser(@Param('uuid') uuid: string): Promise<void> {
    return this.usersService.deleteUser(uuid);
  }
}
