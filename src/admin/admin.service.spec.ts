import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { admin } from '@prisma/client';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';

describe('AdminService', () => {
  let adminService: AdminService;
  let adminRepository: AdminRepository;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, AdminRepository, PrismaService],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    adminRepository = module.get<AdminRepository>(AdminRepository);
  });

  describe('findAll', (): void => {
    it('관리자 전체 조회', async (): Promise<void> => {
      const result: AdminDto[] = await adminService.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('create', (): void => {
    it('이미 있는 관리자 아이디', async (): Promise<void> => {
      const createAdminDto: CreateAdminDto = CreateAdminDto.of(
        'testUser',
        '12345',
        'wando',
        'test@test.com',
      );

      const mockAdmin: admin = {
        id: 1,
        adminId: 'testUser',
        password: '12345',
        nickname: 'wando',
        email: 'test@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(adminRepository, 'findOneByAdminId')
        .mockResolvedValue(mockAdmin);

      await expect(async (): Promise<void> => {
        await adminService.create(createAdminDto);
      }).rejects.toThrow(new BadRequestException('이미 있는 아이디!'));
    });
  });
});
