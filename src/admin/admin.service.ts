import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  private readonly logger: Logger = new Logger(AdminService.name);
  constructor(private readonly adminRepository: AdminRepository) {}

  async create(createAdminDto: CreateAdminDto): Promise<admin> {
    const passwordHash: string = await bcrypt.hash(createAdminDto.password, 10);

    return await this.adminRepository.create(createAdminDto, passwordHash);
  }

  async findAll(): Promise<admin[]> {
    return this.adminRepository.findAll();
  }

  async findOne(id: number): Promise<admin> {
    return this.adminRepository.findOne(id);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<admin> {
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
    return this.adminRepository.update(id, updateAdminDto, passwordHash);
  }

  async remove(id: number): Promise<admin> {
    return this.adminRepository.remove(id);
  }
}
