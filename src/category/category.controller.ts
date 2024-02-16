import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import {
  GetCurrentUserId,
  Public,
  ResponseMessage,
} from '../common/decorators';
import { CreateCategoryDto } from './dto';
import { Categories } from './types';

@ApiTags('2. 카테고리')
@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  /**
   * 카테고리 생성!
   */
  @ApiBearerAuth()
  @Post()
  @ResponseMessage('카테고리 생성!')
  @ApiCreatedResponse({
    description: `{message: 카테고리 생성!, statudCode: 201, data: null}`,
  })
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    await this.categoryService.createCategory(dto, userId);
  }

  /**
   * 카테고리 최신 순 조회!
   */
  @Get()
  @Public()
  @ResponseMessage('카테고리 최신 순 조회!')
  @ApiOkResponse({
    description: `{message: 카테고리 최신 순 조회!, statusCode: 200, data: []}`,
  })
  @ApiQuery({
    name: 'lastId',
    required: false,
    type: Number,
    description: '현재 조회한 페이지 마지막 id',
  })
  async findAllCategory(@Query('lastId') lastId?: number): Promise<Categories> {
    return await this.categoryService.findAllCategory(lastId);
  }
}
