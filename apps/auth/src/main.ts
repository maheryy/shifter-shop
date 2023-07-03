import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  app.useGlobalPipes(validationPipe);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
