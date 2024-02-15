import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import {
  GetCurrentUserId,
  Public,
  ResponseMessage,
} from '../common/decorators';
import { CreateCategoryDto } from './dto';

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
  findAllCategory(): string {
    return '카테고리 전체 조회!';
  }
}
