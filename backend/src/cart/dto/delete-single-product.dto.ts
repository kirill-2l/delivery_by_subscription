import { IsInt } from "class-validator";

export class DeleteSingleProductDto {
  @IsInt()
  productId: number;
}
