import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { SignupDto } from "../auth/dto/signup.dto";
import { EditUserDto } from "./dto";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UserService {
  constructor(private _prisma: PrismaService) {}
  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this._prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this._prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }

  findById(id: string) {
    return this._prisma.user.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this._prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
    const { where, data } = params;
    return this._prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this._prisma.user.delete({
      where,
    });
  }
}
