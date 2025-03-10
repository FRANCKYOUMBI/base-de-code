import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
  Put,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import {
  AuthInput,
  UpdateMeInput,
  UpdatePasswordInput,
  UpdatePasswordOutput,
} from './dto/auth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthsGuard } from '@/auths/guards/auths.guard';
import { User } from '@/users/models/user.model';
import { Public } from '@/auths/decorators/public.decorator';

@Controller('auths')
@ApiTags('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user with email and password' })
  login(@Body() authInput: AuthInput) {
    return this.authsService.login(authInput);
  }

  @Get('/me')
  @UseGuards(AuthsGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user information' })
  me(@Request() req): User {
    const user = req.user;
    user.password = undefined;
    return user;
  }

  @Put('/me')
  @UseGuards(AuthsGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user information' })
  @UsePipes(new ValidationPipe())
  updateMe(
    @Request() req,
    @Body() updateMeInput: UpdateMeInput,
  ): Promise<User> {
    return this.authsService.updateMe(req.user, updateMeInput);
  }

  @Put('/me/password')
  @UseGuards(AuthsGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user password' })
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Request() req,
    @Body() updatePasswordInput: UpdatePasswordInput,
  ): Promise<UpdatePasswordOutput> {
    return this.authsService.updatePassword(req.user, updatePasswordInput);
  }
}
