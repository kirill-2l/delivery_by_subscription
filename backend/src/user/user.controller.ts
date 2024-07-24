import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { Public } from "../auth/decorators/public.decorator";
import { JwtGuard } from "../auth/guards";
import { GetUser } from "../auth/decorators";
import { User } from "@prisma/client";

@Controller("users")
export class UserController {
  @Public()
  @UseGuards(JwtGuard)
  @Get("me")
  getMe(@GetUser() user: User) {
    return user;
  }
}
