import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as cookieParser from 'cookie-parser';
// import { CorsOptions } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(cookieParser())
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  app.enableCors();
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
