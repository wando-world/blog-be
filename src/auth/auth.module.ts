import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
