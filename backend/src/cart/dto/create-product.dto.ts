import { IsInt } from "class-validator";
import { Product } from "@prisma/client";
import { Cookies } from "../../common/decorators/cookies.decorator";

export class CreateProductDto {
  @IsInt()
  productId: Product["id"];
}
