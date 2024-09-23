import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProductId } from "./types";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.product.findMany();
  }

  findById(productId: ProductId) {
    return this.prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
  }
}
