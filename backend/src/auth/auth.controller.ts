import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { Public } from "./decorators/public.decorator";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";
import { Tokens } from "./types";
import { RtGuard } from "./guards";
import { GetUser, GetUserId } from "./decorators";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SigninDto): Promise<Tokens> {
    return this.authService.signin(dto);
  }

  @Public()
  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refreshToken(@GetUserId() userId: string, @GetUser("refreshToken") refreshToken: string) {
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@GetUserId() userId: string) {
    return this.authService.logout(userId);
  }

  @Get("profile")
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }
}
