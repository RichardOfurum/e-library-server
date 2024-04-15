// import 'dotenv/config';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// // import * as cookieParser from 'cookie-parser';
// // import { CorsOptions } from '@nestjs/platform-express';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, { cors: true });
//   // app.use(cookieParser())
//   app.setGlobalPrefix('api');
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist: true,
//     transform: true,
//     transformOptions: {
//       enableImplicitConversion: true,
//     }
//   }));

//    // Define your CORS configuration
//    const corsOptions: CorsOptions = {
//     origin: ['https://e-library-client.vercel.app'], // Replace with your frontend's origin(s)

//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // Enable CORS credentials (if needed)
//   };

//   app.enableCors();
//   await app.listen(process.env.PORT, '0.0.0.0');
// }
// bootstrap();

import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Set global prefix for your API routes
  app.setGlobalPrefix('api');

  // Use validation pipe globally to automatically validate incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: ['https://e-library-client.vercel.app'], // Replace with your frontend's origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable CORS credentials (if needed)
  });

  // Start the application
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
