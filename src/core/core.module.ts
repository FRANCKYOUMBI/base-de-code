import { Module } from '@nestjs/common';
import { join } from 'path';
import { cwd } from 'process';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '@/users/users.module';
import { MigrationsModule } from '@/migrations/migrations.module';
import { AuthsModule } from '@/auths/auths.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { StoragesModule } from '@/storages/storages.module';
import { LoggingInterceptor } from '@/core/interceptors/logging.interceptor';
import { CoreController } from '@/core/core.controller';
import { CustomersModule } from '@/customers/customers.module';
import { NotificationsModule } from '@/notifications/notifications.module';


@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fr',
      fallbacks: {
        'en-*': 'en',
        'fr-*': 'fr',
      },
      loaderOptions: {
        path: join(cwd(), '/i18n/'),
        watch: true,
      },
      typesOutputPath: join(cwd(), '/src/generated/i18n.generated.ts'),
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(join(cwd(), 'public')),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(<string>configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USER') as string,
        password: configService.get('DATABASE_PASSWORD') as string,
        database: configService.get('DATABASE_DB') as string,
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthsModule,
    UsersModule,
    CustomersModule,
    StoragesModule,
    NotificationsModule,
    MigrationsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [CoreController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class CoreModule {}
