import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AtStrategy } from "./strategies";
import { RtStrategy } from "./strategies/rt.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
  imports: [UserModule, JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
