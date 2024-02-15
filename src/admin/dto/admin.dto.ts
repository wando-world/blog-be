import { Admin } from '@prisma/client';

export class AdminDto {
  id: number;
  username: string;
  nickname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(admin: Admin) {
    this.id = admin.id;
    this.username = admin.username;
    this.nickname = admin.nickname;
    this.email = admin.email;
    this.createdAt = admin.createdAt;
    this.updatedAt = admin.updatedAt;
  }
}
