import { IsInt } from "class-validator";
import { Product } from "@prisma/client";

export class CreateProductDto {
  @IsInt()
  productId: Product["id"];
}
