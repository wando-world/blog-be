import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    name: 'adminId',
    description: '관리자 아이디!',
    example: 'wando',
    type: String,
  })
  @IsString({ message: '아아디는 문자열만 가능!' })
  @MinLength(5, { message: '아이디는 최소 $constraint1 자리 이상!, $value' })
  @MaxLength(10, { message: '아이디는 최대 $constraint1 자리!, $value' })
  adminId: string;

  @ApiProperty({
    name: 'adminId',
    description: '비밀번호!',
    example: '1234',
    type: String,
  })
  @IsString({ message: '비밀번호는 문자열만 가능!' })
  @MinLength(5, { message: '아이디는 최소 $constraint1 자리 이상!, $value' })
  @MaxLength(10, { message: '아이디는 최대 $constraint1 자리!, $value' })
  password: string;

  @ApiProperty({
    name: 'adminId',
    description: '비밀번호!',
    example: '1234',
    type: String,
  })
  @IsString({ message: '아아디는 문자열만 가능!' })
  @MinLength(5, { message: '아이디는 최소 $constraint1 자리 이상!, $value' })
  @MaxLength(10, { message: '아이디는 최대 $constraint1 자리!, $value' })
  nickname: string;

  @ApiProperty({
    name: 'adminId',
    description: '비밀번호!',
    example: '1234',
    type: String,
  })
  @IsString({ message: '아아디는 문자열만 가능!' })
  @MinLength(5, { message: '아이디는 최소 $constraint1 자리 이상!, $value' })
  @MaxLength(10, { message: '아이디는 최대 $constraint1 자리!, $value' })
  email: string;
}
