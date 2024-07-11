import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SigninDto) {
    return this._authService.signIn(
      await this._authService.validateUser(signInDto.email, signInDto.password),
    );
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
