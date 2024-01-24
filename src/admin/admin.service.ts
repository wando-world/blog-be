import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { admin } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  private readonly logger: Logger = new Logger(AdminService.name);
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

    return this.prismaService.admin
      .update({
        where: { id },
        data: {
          adminId: updateAdminDto.adminId,
          password: passwordHash,
          nickname: updateAdminDto.nickname,
          email: updateAdminDto.email,
        },
      })
      .catch((err) => {
        this.logger.error(
          `update admin err:  ${JSON.stringify(err.meta, null, 0)} / code: ${err.code}`,
        );
        if (err.code === 'P2025') {
          throw new NotFoundException('수정할게 없음!');
        }
        throw new HttpException('서버 에러!', HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async remove(id: number): Promise<admin> {
    return this.prismaService.admin
      .delete({
        where: { id },
      })
      .catch((err) => {
        this.logger.error(
          `delete admin err: ${JSON.stringify(err.meta, null, 0)} / code: ${err.code}`,
        );
        if (err.code === 'P2025') {
          throw new NotFoundException('지울게 없음!');
        }
        throw new HttpException('서버 에러!', HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
