import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoreService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.store.findMany({
      where: {
        active: true,
      },
    });
  }

  async getStore(id: number) {
    const { id: storeId, name } = await this.prismaService.store.findFirst({
      where: {
        id,
        active: true,
      },
    });

    return {
      id: storeId,
      name,
    };
  }
}
