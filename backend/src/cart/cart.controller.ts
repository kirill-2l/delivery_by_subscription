import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { GetUser } from "../auth/decorators";
import { CartService } from "./cart.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { DeleteSingleProductDto } from "./dto/delete-single-product.dto";
import { DeleteCartItemDto } from "./dto/delete-cart-item.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  userCart(@GetUser("id") userId: number) {
    return this.cartService.getUserCart(userId);
  }

  @Post("/product")
  addProduct(@GetUser("id") userId: number, @Body() dto: CreateProductDto) {
    return this.cartService.addProduct(userId, dto);
  }

  @Delete("/cart-item")
  deleteCartItem(@GetUser("id") userId: number, @Body() dto: DeleteCartItemDto) {
    return this.cartService.deleteCartItem(userId, dto);
  }

  @Delete("/cart-line")
  deleteSingleProduct(@GetUser("id") userId: number, @Body() dto: DeleteSingleProductDto) {
    return this.cartService.deleteCartLine(userId, dto);
  }
}
