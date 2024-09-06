import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoreService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.store.findMany();
  }
}
