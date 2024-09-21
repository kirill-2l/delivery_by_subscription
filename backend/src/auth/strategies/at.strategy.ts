import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "../../user/user.service";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    config: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_AT_SECRET"),
    });
  }

  async validate({ sub }: { sub: number }) {
    const user = await this.userService.findById(sub);
    if (!user) throw new ForbiddenException("User not found");
    const { hash, hashedRt, active, createdAt, updatedAt, lastLoginAt, ...rest } = user;
    return rest;
  }
}
