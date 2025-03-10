import { Controller, Post } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from '@/auths/decorators/public.decorator';

@Controller('migrations')
@ApiTags('migrations')
export class MigrationsController {
  constructor(private readonly migrationsService: MigrationsService) { }

  @Post('/create-admin-account')
  @ApiOperation({ summary: 'Create default admin account' })
  @ApiConflictResponse({ description: 'Admin account already exists' })
  @ApiCreatedResponse({ description: 'Admin account created' })
  @Public()
  create_admin_account() {
    return this.migrationsService.createAdminAccount();
  }


  // Create default currencies
  // @Post('/create-default-currencies')
  // @ApiOperation({ summary: 'Create default currencies' })
  // @ApiCreatedResponse({ description: 'Default currencies created' })
  // @Public()
  // create_default_currencies() {
  //   return this.migrationsService.createDefaultCurrencies();
  // }

}
