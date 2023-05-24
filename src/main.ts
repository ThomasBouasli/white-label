import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  app.enableCors({
    credentials: true,
    origin: process.env.APP_URL,
  });

  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3333);
}
bootstrap();
