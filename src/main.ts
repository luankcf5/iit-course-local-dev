import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { json, static as static_ } from 'express';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api');
  app.use('/uploads', static_('upload'));
  app.use('/sheet', static_('outputs/exam/baithi01/HinhAnhKiemTra'));
  app.enableCors();
  app.use('/scorms', static_('scorm-outputs'));
  app.use(json({ limit: '200mb' }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const cfgService = app.get(ConfigService);
  await app.listen(cfgService.get<number>('PORT'));
}
bootstrap();
