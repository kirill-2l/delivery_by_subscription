import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { UserService } from "../../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate({ sub }: { sub: string }) {
    const user = await this.userService.findById(sub);
    delete user.hash;
    return user;
  }
}
