import { Body, Controller, Delete, Get, Post, Res } from "@nestjs/common";
import { GetUser, Public } from "../auth/decorators";
import { CartService } from "./cart.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { DeleteSingleProductDto } from "./dto/delete-single-product.dto";
import { DeleteCartItemDto } from "./dto/delete-cart-item.dto";
import { Cookies } from "../common/decorators/cookies.decorator";
import { Response } from "express";

const cookieTokenKey = "cartToken" as const;

@Public()
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async userCart(
    @Res({ passthrough: true }) response: Response,
    @Cookies(cookieTokenKey) token?: string,
    @GetUser("id") userId?: number,
  ) {
    const res = await this.cartService.getUserCart(userId, token);
    response.cookie(cookieTokenKey, res.token);
    return res;
  }

  @Post("/product")
  addProduct(@GetUser("id") userId: number, @Body() dto: CreateProductDto, @Cookies(cookieTokenKey) token?: string) {
    return this.cartService.addProduct(userId, dto, token);
  }

  @Delete("/cart-item")
  deleteCartItem(
    @Body() dto: DeleteCartItemDto,
    @GetUser("id") userId?: number,
    @Cookies(cookieTokenKey) token?: string,
  ) {
    return this.cartService.deleteCartItem(dto, userId, token);
  }

  @Delete("/cart-line")
  deleteSingleProduct(
    @Body() dto: DeleteSingleProductDto,
    @GetUser("id") userId: number,
    @Cookies(cookieTokenKey) token?: string,
  ) {
    return this.cartService.deleteCartLine(dto, userId, token);
  }
}
