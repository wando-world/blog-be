import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IPayload } from './security/payload.interface';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async signIn(adminId: string, password: string): Promise<JwtDto> {
    const admin: admin = await this.adminService.findOneByAdminId(adminId);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('해당 관리자는 없어!');
    }

    const payload: IPayload = {
      id: admin.id,
      sub: admin.adminId,
      nickname: admin.nickname,
    };
    const atk: string = await this.jwtService.signAsync(payload);

    return new JwtDto(payload, atk);
  }
}
