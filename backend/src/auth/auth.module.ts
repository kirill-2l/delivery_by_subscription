import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthGuard } from "./auth.guard";
import { JwtStrategy } from "./strategies";

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    JwtStrategy,
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
