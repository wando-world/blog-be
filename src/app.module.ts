import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    AdminModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
  ],
})
export class AppModule {}
