import { IsString } from 'class-validator';

export class SigninAuthDto {
  /**
   * 관리자 아이디
   * @example testUser
   */
  @IsString({ message: '아아디는 문자열만 가능!' })
  username: string;

  /**
   * 비밀번호
   * @example 12345
   */
  @IsString({ message: '비밀번호는 문자열만 가능!' })
  password: string;

  static of(username: string, password: string): SigninAuthDto {
    const signupAuthDto: SigninAuthDto = new SigninAuthDto();
    signupAuthDto.username = username;
    signupAuthDto.password = password;
    return signupAuthDto;
  }
}
