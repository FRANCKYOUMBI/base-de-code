import { Module } from '@nestjs/common';
import { MigrationsService } from './migrations.service';
import { MigrationsController } from './migrations.controller';
import { UsersModule } from '@/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { StoragesModule } from '@/storages/storages.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MigrationsController],
  providers: [MigrationsService],
  imports: [
    TypeOrmModule.forFeature([
      // ProductType,
      // Product,
     
    ]),
    UsersModule,
    ConfigModule,
    StoragesModule,
    // ProductsModule,
  ],
})
export class MigrationsModule {}
