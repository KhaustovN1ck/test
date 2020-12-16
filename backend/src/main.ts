import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ['Content-Type'],
      origin: '*',
      preflightContinue: true,
    },
  });
  await app.listen(3001);
}

bootstrap();