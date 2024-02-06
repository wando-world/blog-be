import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  /**
   * 관리자 아이디
   * @example testUser
   */
  @IsString({ message: '아아디는 문자열만 가능!' })
  @IsNotEmpty({ message: '비어서는 안됨!' })
  username: string;

  /**
   * 비밀번호
   * @example 1234
   */
  @IsString({ message: '비밀번호는 문자열만 가능!' })
  @IsNotEmpty({ message: '비어서는 안됨!' })
  password: string;

  /**
   * 닉네임
   * @example 완도
   */
  @IsString({ message: '닉네임은 문자열만 가능!' })
  @IsNotEmpty({ message: '비어서는 안됨!' })
  nickname: string;

  /**
   * 이메일
   * @example test@naver.com
   */
  @IsString({ message: '이메일은 문자열만 가능!' })
  @IsNotEmpty({ message: '비어서는 안됨!' })
  email: string;
}
