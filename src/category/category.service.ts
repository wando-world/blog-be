import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto, userId: number): Promise<void> {
    await this.prisma.category.create({
      data: {
        name: dto.name,
        adminId: userId,
      },
    });
  }
}
