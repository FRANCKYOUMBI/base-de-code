import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { UsersModule } from '@/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/users/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthsGuard } from '@/auths/guards/auths.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/auths/guards/roles.guard';
import { MailingModule } from '@/mailing/mailing.module';
import { StoragesModule } from '@/storages/storages.module';

@Module({
  controllers: [AuthsController],
  providers: [
    AuthsService,
    {
      provide: APP_GUARD,
      useClass: AuthsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: ConfigService.get('JWT_EXPIRES_IN') },
      }),
    }),
    ConfigModule,
    UsersModule,
    MailingModule,
    StoragesModule,
  ],
})
export class AuthsModule {}
