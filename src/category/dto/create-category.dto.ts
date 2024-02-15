import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  /**
   * 카테고리 명
   * @example Javascript
   */
  @IsString({ message: '카테고리명은 문자열만 가능!' })
  @MinLength(1, {
    message: '카테고리명은 최소 $constraint1 자리 이상!, 입력값: $value',
  })
  name: string;
}
