import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { CommonModule } from "../common/common.module";
import { ProductModule } from "../product/product.module";
import { UserModule } from "../user/user.module";

@Module({
  providers: [CartService],
  controllers: [CartController],
  imports: [CommonModule, ProductModule, UserModule],
})
export class CartModule {}
