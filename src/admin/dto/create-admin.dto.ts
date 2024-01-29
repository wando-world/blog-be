import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {
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

  /**
   * 닉네임
   * @example wando
   */
  @IsString({ message: '닉네임은 문자열만 가능!' })
  @MinLength(1, {
    message: '닉네임은 최소 $constraint1 자리 이상!, 입력값: $value',
  })
  nickname: string;

  /**
   * 이메일
   * @example test@naver.com
   */
  @IsEmail({}, { message: '이메일 형식으로 입력필요!, 입력값: $value' })
  email: string;

  static of(
    adminId: string,
    password: string,
    nickname: string,
    email: string,
  ): CreateAdminDto {
    const createAdminDto: CreateAdminDto = new CreateAdminDto();
    createAdminDto.adminId = adminId;
    createAdminDto.password = password;
    createAdminDto.nickname = nickname;
    createAdminDto.email = email;
    return createAdminDto;
  }
}
