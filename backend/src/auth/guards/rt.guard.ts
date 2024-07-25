import { AuthGuard } from "@nestjs/passport";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { JwtPayload, JwtPayloadWithRt } from "../types";
import { Request } from "express";

@Injectable()
export class RtGuard extends AuthGuard("jwt-refresh") {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("JWT_RT_SECRET"),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = req?.get("authorization")?.replace("Bearer", "").trim();

    console.log(payload);
    if (!refreshToken) throw new ForbiddenException("Refresh token malformed");
    return {
      ...payload,
      refreshToken,
    };
  }
}
