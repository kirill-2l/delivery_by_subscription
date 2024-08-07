import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User, UserService } from "../user/user.service";
import { SigninDto, SignupDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { Tokens } from "./types";

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
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async signin(dto: SigninDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) throw new ForbiddenException("Credentials are incorrect");

    const match = await bcrypt.compare(dto.password, user.hash);

    if (!match) throw new ForbiddenException("Credentials are incorrect");

    delete user.hash;
    const tokens = await this.signToken(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signup(dto: SignupDto) {
    const hash = await this.hashData(dto.password);
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      const tokens = await this.signToken(newUser.id, newUser.email);
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new ForbiddenException("Credentials taken");
        }
      }
      throw err;
    }
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshToken(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException("Credentials are incorrect");

    const match = bcrypt.compare(user.hashedRt, rt);

    if (!match) throw new ForbiddenException("Credentials taken");

    const tokens = await this.signToken(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signToken(userId: string, email: string): Promise<Tokens> {
    const payload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwt.signAsync(payload, {
        expiresIn: "15m",
        secret: this.config.get("JWT_AT_SECRET"),
      }),

      await this.jwt.signAsync(payload, {
        expiresIn: "1w",
        secret: this.config.get("JWT_RT_SECRET"),
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 12);
  }
}
