import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AdminRepository } from './admin.repository';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  private readonly logger: Logger = new Logger(AdminService.name);
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(createAdminDto: CreateAdminDto): Promise<void> {
    // admin id 중복 체크
    const admin: Admin = await this.findOneByAdminId(createAdminDto.username);
    if (admin) {
      throw new BadRequestException('이미 있는 아이디!');
    }

    const passwordHash: string = await bcrypt.hash(createAdminDto.password, 10);

    await this.adminRepository.create(createAdminDto, passwordHash);
  }

  async findOneByAdminId(username: string): Promise<Admin> {
    return await this.adminRepository.findOneByAdminId(username);
  }

  async findAll(): Promise<AdminDto[]> {
    const admins: Admin[] = await this.adminRepository.findAll();
    return admins.map((admin: Admin) => new AdminDto(admin));
  }

  async findOne(id: number): Promise<AdminDto> {
    const admin: Admin = await this.adminRepository.findOne(id);
    console.assert(
      admin !== null,
      JSON.stringify({ id, msg: '없는 관리자 조회는 말이 안됨!' }, null, 2),
    );
    return new AdminDto(admin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<void> {
    let passwordHash: string | undefined = undefined;

    if (updateAdminDto.password) {
      passwordHash = await bcrypt
        .hash(updateAdminDto.password, 10)
        .catch((err) => {
          this.logger.error(`update admin encrypt password err: ${err}`);
          throw new HttpException(
            'Server error!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    }
    await this.adminRepository.update(id, updateAdminDto, passwordHash);
  }

  async remove(id: number): Promise<void> {
    await this.adminRepository.remove(id);
  }
}
