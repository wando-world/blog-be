import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SigninAuthDto, SignupAuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupAuthDto): Promise<Tokens> {
    const passwordHash: string = await this.hashData(dto.password);
    const newAdmin: Admin = await this.prisma.admin.create({
      data: {
        username: dto.username,
        password: passwordHash,
        nickname: dto.nickname,
        email: dto.email,
      },
    });
    const tokens: Tokens = await this.getTokens(newAdmin.id, newAdmin.username);
    await this.updateRtkHash(newAdmin.id, tokens.rtk);
    return tokens;
  }

  async signin(dto: SigninAuthDto): Promise<Tokens> {
    const user: Admin = await this.prisma.admin.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (!user) throw new ForbiddenException('아이디 또는 비번이 이상함!');

    const passwordMatches: boolean = await bcrypt.compare(
      dto.password,
      user.password,
    );
    if (!passwordMatches)
      throw new ForbiddenException('아이디 또는 비번이 이상함!');

    const tokens: Tokens = await this.getTokens(user.id, user.username);
    await this.updateRtkHash(user.id, tokens.rtk);
    return tokens;
  }
  async logout(userId: number) {
    await this.prisma.admin.updateMany({
      where: {
        id: userId,
        hashedRtk: {
          not: null,
        },
      },
      data: {
        hashedRtk: null,
      },
    });
  }
  refreshToken() {}

  async updateRtkHash(userId: number, rtk: string) {
    const hash = await this.hashData(rtk);
    await this.prisma.admin.update({
      where: {
        id: userId,
      },
      data: {
        hashedRtk: hash,
      },
    });
  }

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, username: string): Promise<Tokens> {
    const [atk, rtk] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY'),
          expiresIn: this.configService.get<string>('ATK_EXPIRES_IN'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('SECRET_KEY'),
          expiresIn: this.configService.get<string>('RTK_EXPIRES_IN'),
        },
      ),
    ]);
    return {
      atk,
      rtk,
    };
  }
}
