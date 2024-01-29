import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
