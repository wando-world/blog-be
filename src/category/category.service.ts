import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';
import { Category } from '@prisma/client';
import { Categories } from './types';

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

  async findAllCategory(lastId: number): Promise<Categories> {
    const categories: Category[] = await this.prisma.category.findMany({
      take: 10,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        admin: {
          select: {
            nickname: true,
          },
        },
      },
    });
    const lastCategoryIndex: number = categories.length - 1;
    const lastCategoryResults: Category | undefined =
      categories[lastCategoryIndex];
    const cursor: number | null = lastCategoryResults
      ? lastCategoryResults.id
      : null;

    return {
      lastId: cursor,
      categories,
    };
  }
}
