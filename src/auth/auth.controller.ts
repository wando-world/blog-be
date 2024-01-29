import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { JwtDto } from './dto/jwt.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 로그인!
   */
  @Post('sign-in')
  @ResponseMessage('로그인 완료!')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<JwtDto> {
    return await this.authService.signIn(signInDto.adminId, signInDto.password);
  }
}
