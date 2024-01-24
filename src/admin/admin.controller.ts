import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { admin } from '@prisma/client';
import { ResponseMessage } from '../common/decorators/response.message.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ResponseMessage('생성 완료!')
  async create(@Body() createAdminDto: CreateAdminDto): Promise<void> {
    await this.adminService.create(createAdminDto);
  }

  @Get()
  @ResponseMessage('조회 완료!')
  async findAll(): Promise<admin[]> {
    return await this.adminService.findAll();
  }

  @Get(':id')
  @ResponseMessage('조회 완료!')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<admin> {
    const foundOne: admin = await this.adminService.findOne(id);

    if (foundOne == null) {
      throw new HttpException('없는 관리자!', HttpStatus.NOT_FOUND);
    }

    return foundOne;
  }

  @Patch(':id')
  @ResponseMessage('수정 완료!')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<void> {
    await this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @ResponseMessage('삭제 완료!')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.adminService.remove(id);
  }
}
