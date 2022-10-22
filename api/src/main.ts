import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Digitrans MRP')
    .setDescription('The MRP API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  // uncomment if first use
  // const accountService = app.get(UserService);
  // await accountService.initAdmin();

  await app.listen(3001);
}
bootstrap();
