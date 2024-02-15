import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtkGuard } from './common/guards';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    AdminModule,
    AuthModule,
    PrismaModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtkGuard,
    },
  ],
})
export class AppModule {}
