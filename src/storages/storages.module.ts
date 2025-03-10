import { Module } from '@nestjs/common';
import { StoragesService } from './storages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './models/storage.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StoragesController } from './storages.controller';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Storage]),
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          endPoint: configService.get('MINIO_URL'),
          port: parseInt(configService.get('MINIO_PORT')),
          useSSL: false,
          accessKey: configService.get('MINIO_ACCESS_KEY'),
          secretKey: configService.get('MINIO_SECRET_KEY'),
        };
      },
    }),
  ],
  providers: [StoragesService],
  controllers: [StoragesController],
  exports: [StoragesService],
})
export class StoragesModule {}
