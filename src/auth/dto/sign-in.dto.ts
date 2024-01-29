import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  /**
   * 관리자 아이디
   * @example testUser
   */
  @IsString({ message: '아아디는 문자열만 가능!' })
  @MinLength(5, {
    message: '아이디는 최소 $constraint1 자리 이상!, 입력값: $value',
  })
  @MaxLength(10, {
    message: '아이디는 최대 $constraint1 자리!, 입력값: $value',
  })
  adminId: string;

  /**
   * 비밀번호
   * @example 12345
   */
  @IsString({ message: '비밀번호는 문자열만 가능!' })
  @MinLength(5, {
    message: '비밀번호는 최소 $constraint1 자리 이상!, 입력값: $value',
  })
  @MaxLength(10, {
    message: '비밀번호는 최대 $constraint1 자리!, 입력값: $value',
  })
  password: string;
}
