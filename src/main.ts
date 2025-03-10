import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CoreModule } from '@/core/core.module';
import { urlencoded, json } from 'express';
import { env } from 'process';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('APP Boutique API')
    .setDescription(
      'API for store management, user management, and other features',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(json({ limit: '250mb' }));
  app.use(urlencoded({ extended: true, limit: '250mb' }));
  app.use(helmet());
  app.enableCors();
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //   }),
  // );
  await app.listen(env.PORT || 3000, '0.0.0.0');
}

bootstrap();
