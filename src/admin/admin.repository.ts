import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { admin } from '@prisma/client';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAdminDto: CreateAdminDto,
    password: string,
  ): Promise<admin> {
    const { adminId, nickname, email } = createAdminDto;

    return await this.prismaService.admin.create({
      data: {
        adminId,
        password,
        nickname,
        email,
      },
    });
  }

  async findAll(): Promise<admin[]> {
    return await this.prismaService.admin.findMany();
  }

  async findOne(id: number): Promise<admin> {
    return this.prismaService.admin.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateAdminDto: UpdateAdminDto,
    password: string,
  ): Promise<admin> {
    const { adminId, nickname, email } = updateAdminDto;

    const data: {
      adminId: string;
      nickname: string;
      email: string;
      password: string;
    } = {
      adminId,
      nickname,
      email,
      password,
    };
    return this.prismaService.admin.update({
      where: { id },
      data: data as any,
    });
  }

  async remove(id: number): Promise<admin> {
    return this.prismaService.admin.delete({
      where: { id },
    });
  }
}
