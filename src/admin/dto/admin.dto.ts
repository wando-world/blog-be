import { admin } from '@prisma/client';

export class AdminDto {
  id: number;
  adminId: string;
  nickname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(admin: admin) {
    this.id = admin.id;
    this.adminId = admin.adminId;
    this.nickname = admin.nickname;
    this.email = admin.email;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
  }
}
