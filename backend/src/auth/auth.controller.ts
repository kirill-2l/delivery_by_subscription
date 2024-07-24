import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from "@nestjs/common";
import { Public } from "./decorators/public.decorator";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signin(@Body() dto: SigninDto) {
    return this._authService.signin(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("signup")
  async signup(@Body() dto: SignupDto) {
    return this._authService.signup(dto);
  }

  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
