import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User, UserService } from "../user/user.service";
import { SigninDto, SignupDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

export interface TokenResponse {
  refreshToken?: string;
  access_token: string;
}

export interface SignInResponse {
  tokens: TokenResponse;
  user: User;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwt: JwtService,
    private prismaService: PrismaService,
    private config: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("User does not exist");
    }
    const isMatch = await bcrypt.compare(pass, user?.hash);
    if (!isMatch) {
      throw new UnauthorizedException("Incorrect password");
    }

    return user;
  }

  async signin(dto: SigninDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new ForbiddenException("Credentials are incorrect");
    console.log(dto.password, user.hash);
    const match = await bcrypt.compare(dto.password, user.hash);

    if (!match) throw new ForbiddenException("Credentials are incorrect");

    delete user.hash;
    return this.signToken(user.id, user.email);
  }

  async signup(dto: SignupDto) {
    const hash = await bcrypt.hash(dto.password, 12);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new ForbiddenException("Credentials taken");
        }
      }
      throw err;
    }
  }

  async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get("JWT_SECRET");
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret,
    });

    return {
      access_token: token,
    };
  }
}
