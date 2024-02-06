import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { AuthService } from './auth.service';
import { SigninAuthDto, SignupAuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 회원가입!
   */
  @Post('singup')
  @ResponseMessage('회원 가입 완료!')
  @ApiCreatedResponse({
    description: `{message: 회원 가입 완료!, statuscode: 201, data: null}`,
  })
  async signup(@Body() dto: SignupAuthDto): Promise<Tokens> {
    return await this.authService.signup(dto);
  }

  /**
   * 로그인!
   */
  @Post('signin')
  @ResponseMessage('로그인!')
  @ApiCreatedResponse({
    description: `{message: 로그인!, statuscode: 200, data: null}`,
  })
  async signin(@Body() dto: SigninAuthDto): Promise<Tokens> {
    return await this.authService.signin(dto);
  }

  /**
   * 로그아웃!
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @ResponseMessage('로그아웃!')
  @ApiCreatedResponse({
    description: `{message: 로그아웃!, statuscode: 200, data: null}`,
  })
  async logout(@Request() req: any): Promise<void> {
    const user = req.user;
    await this.authService.logout(user['id']);
  }

  /**
   * 토큰 갱신!
   */
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @ResponseMessage('토큰 재발급!')
  @ApiCreatedResponse({
    description: `{message: 토큰 재발급!, statuscode: 200, data: null}`,
  })
  async refreshToken() {
    this.authService.refreshToken();
  }
}
