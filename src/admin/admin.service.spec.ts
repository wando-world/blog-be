import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { admin } from '@prisma/client';
import { AdminRepository } from './admin.repository';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('AdminService', () => {
  let adminService: AdminService;
  let adminRepository: AdminRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService, AdminRepository, PrismaService],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    adminRepository = module.get<AdminRepository>(AdminRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', (): void => {
    it('관리자 전체 조회', async (): Promise<void> => {
      const result: admin[] = await adminService.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  // describe('findOne', (): void => {
  //   it('관리자 한명 조회', async () => {
  //
  //   })
  // })

  describe('create', (): void => {
    it('관리자 생성', async (): Promise<void> => {
      const createAdminDto: CreateAdminDto = CreateAdminDto.of(
        'testUser',
        '12345',
        'wando',
        'test@test.com',
      );

      const mockAdmin: admin = {
        id: 1,
        adminId: 'testUser111',
        password: '12345',
        nickname: 'wando',
        email: 'test@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(adminRepository, 'create').mockResolvedValue(mockAdmin);

      const result = await adminService.create(createAdminDto);
      console.log('wando ???')
      expect(result.adminId).toBe(mockAdmin.adminId);
      expect(result.email).toBe(mockAdmin.email);
    });
  });
});
