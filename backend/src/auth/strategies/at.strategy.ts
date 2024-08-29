import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
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

  async validate({ sub }: { sub: string }) {
    const { hash, hashedRt, active, createdAt, updatedAt, lastLoginAt, ...rest } = await this.userService.findById(sub);

    return rest;
  }
}
