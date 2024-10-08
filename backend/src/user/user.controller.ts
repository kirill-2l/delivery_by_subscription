import { Controller, Get, UseGuards } from "@nestjs/common";
import { AtGuard } from "../auth/guards";
import { GetUser } from "../auth/decorators";
import { User } from "@prisma/client";
import { UserService } from "./user.service";

@Controller("users")
@UseGuards(AtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  getMe(@GetUser() user: User) {
    return user;
  }

  // @UseGuards(JwtGuard)
  // @Patch()
  // editUser(@GetUser("id") userId: string, dto: EditUserDto) {
  //   return this.userService.editUser(userId, dto);
  // }
}
