import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // Enable CORS for frontend website
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Set global API route prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`🚀 Portfolio Core Backend running at: http://localhost:${port}/api`);
  logger.log(`📌 Portfolio Data Endpoint: http://localhost:${port}/api/portfolio`);
}

await bootstrap();
