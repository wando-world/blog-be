import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AdminRepository } from './admin.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, AdminRepository],
  exports: [AdminService],
})
export class AdminModule {}
