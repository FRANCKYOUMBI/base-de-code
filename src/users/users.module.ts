import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@/users/users.service';
import { UsersController } from '@/users/users.controller';
import { User } from '@/users/models/user.model';
import { Token } from '@/users/models/token.model';
@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
