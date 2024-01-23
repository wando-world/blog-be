import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { admin } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async create(createAdminDto: CreateAdminDto): Promise<admin> {
    const passwordHash: string = await bcrypt.hash(createAdminDto.password, 10);

    return this.prismaService.admin.create({
      data: {
        adminId: createAdminDto.adminId,
        password: passwordHash,
        nickname: createAdminDto.nickname,
        email: createAdminDto.email,
      },
    });
  }

  async findAll(): Promise<admin[]> {
    return this.prismaService.admin.findMany();
  }

  async findOne(id: number): Promise<admin> {
    return this.prismaService.admin.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<admin> {
    const passwordHash: string = await bcrypt.hash(updateAdminDto.password, 10);

    return this.prismaService.admin.update({
      where: { id },
      data: {
        adminId: updateAdminDto.adminId,
        password: passwordHash,
        nickname: updateAdminDto.nickname,
        email: updateAdminDto.email,
      },
    });
  }

  async remove(id: number): Promise<admin> {
    return this.prismaService.admin.delete({
      where: { id },
    });
  }
}
