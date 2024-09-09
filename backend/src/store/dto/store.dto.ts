import { IsInt } from "class-validator";

export class StoreDto {
  @IsInt()
  id: number;
}
