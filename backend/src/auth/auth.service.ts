import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UsersService } from '../users/users.service';

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
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }

  async signIn(user: User): Promise<SignInResponse> {
    const payload = { sub: user.id, username: user.email };
    return {
      tokens: {
        access_token: await this.jwtService.signAsync(payload),
      },
      user,
    };
  }
}
