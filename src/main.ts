import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
// import { AtkGuard } from './common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT', 3000);
  const reflector: Reflector = new Reflector();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseTransformInterceptor(reflector),
  );
  // app.useGlobalGuards(new AtkGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle(`Wando's Blog API`)
    .setDescription(`The Wando's API description`)
    .setVersion('1.0')
    .addTag('1. 인증/인가', '인증/인가 관련 API')
    .addTag('2. 카테고리', '카테고리 관련 API')
    .addTag('admin', '관리자 관련 API')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.get(PrismaService).enableShutdownHooks(app);

  await app.listen(port);
}
bootstrap();
