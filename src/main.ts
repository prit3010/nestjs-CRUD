import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // WhiteList is to remove the fields that are not in the DTO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))
  await app.listen(3333);
}
bootstrap();
