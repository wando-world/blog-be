import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {LoggingInterceptor} from "./common/interceptors/logging.interceptor";
import {ResponseTransformInterceptor} from "./common/interceptors/response.transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseTransformInterceptor(new Reflector()))
  await app.listen(3000);
}
bootstrap();
