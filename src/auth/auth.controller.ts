import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninAuthDto, SignupAuthDto } from './dto';
import { Tokens } from './types';
import { RtkGuard } from '../common/guards';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
  ResponseMessage,
} from '../common/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 회원가입!
   */
  @Public()
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
  @Public()
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
  @ApiBearerAuth()
  @Post('logout')
  @ResponseMessage('로그아웃!')
  @ApiCreatedResponse({
    description: `{message: 로그아웃!, statuscode: 200, data: null}`,
  })
  async logout(@GetCurrentUserId() userId: number): Promise<void> {
    await this.authService.logout(userId);
  }

  /**
   * 토큰 갱신!
   */
  @ApiBearerAuth()
  @Public()
  @UseGuards(RtkGuard)
  @Post('refresh')
  @ResponseMessage('토큰 재발급!')
  @ApiCreatedResponse({
    description: `{message: 토큰 재발급!, statuscode: 200, data: null}`,
  })
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('rtk') rtk: string,
  ): Promise<Tokens> {
    console.log(userId, rtk);
    return await this.authService.refreshToken(userId, rtk);
  }
}
