import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from '@prisma/client';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createAdminDto: CreateAdminDto,
    password: string,
  ): Promise<void> {
    const { username, nickname, email } = createAdminDto;

    await this.prismaService.admin.create({
      data: {
        username,
        password,
        nickname,
        email,
      },
    });
  }

  async findOneByAdminId(username: string): Promise<Admin> {
    return this.prismaService.admin.findUnique({
      where: {
        username,
      },
    });
  }

  async findAll(): Promise<Admin[]> {
    return this.prismaService.admin.findMany();
  }

  async findOne(id: number): Promise<Admin> {
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
  ): Promise<void> {
    const { nickname, email } = updateAdminDto;

    const data: {
      nickname: string;
      email: string;
      password: string;
    } = {
      nickname,
      email,
      password,
    };
    await this.prismaService.admin.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.admin.delete({
      where: { id },
    });
  }
}
