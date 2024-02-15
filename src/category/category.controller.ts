import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { GetCurrentUserId, ResponseMessage } from '../common/decorators';
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
}
