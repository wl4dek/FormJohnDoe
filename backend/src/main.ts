import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';
import { env } from '@infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.enableCors({ origin: env.corsOrigin, credentials: true });

  await app.listen(env.port, '0.0.0.0');
  console.log(`Servidor rodando em http://0.0.0.0:${env.port}`);
}

bootstrap();
