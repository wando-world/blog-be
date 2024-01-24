import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString({
    message: '아아디는 문자열만 가능!',
  })
  @MinLength(5, {
    message: '아이디는 최소 $constraint1 자리 이상!, $value',
  })
  @MaxLength(10, {
    message: '아이디는 최대 $constraint1 자리!, $value',
  })
  adminId: string;
  @IsString()
  password: string;
  @IsString()
  nickname: string;
  @IsString()
  email: string;
}
