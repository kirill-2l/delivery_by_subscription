import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res } from "@nestjs/common";
import { GetUser, Public } from "../auth/decorators";
import { CartService } from "./cart.service";
import { DeleteSingleProductDto } from "./dto/delete-single-product.dto";
import { Cookies } from "../common/decorators/cookies.decorator";
import { Response } from "express";
import { COOKIE_TOKEN_KEY, setCookie } from "./utils/response.util";

@Public()
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Res({ passthrough: true }) response: Response, @Cookies(COOKIE_TOKEN_KEY) token?: string) {
    const res = await this.cartService.getUserCart(token);
    setCookie(response, res.token);
    return res;
  }

  @Post("/product/:productId")
  async addProduct(
    @Param("productId") productId: number,
    @Res({ passthrough: true }) response: Response,
    @Cookies(COOKIE_TOKEN_KEY) token?: string,
  ) {
    const res = await this.cartService.addProduct(productId, token);
    setCookie(response, res.token);
    return res;
  }

  @Delete("/product/:productId")
  async deleteSingleProduct(
    @Res({ passthrough: true }) response: Response,
    @Param("productId") productId: number,
    @Cookies(COOKIE_TOKEN_KEY, ParseIntPipe) token: number,
  ) {
    const res = await this.cartService.deleteCartItem(productId, token);
    setCookie(response, res.token);
  }

  @Delete("/cart-line")
  async deleteCartItem(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: DeleteSingleProductDto,
    @GetUser("id") userId: number,
    @Cookies(COOKIE_TOKEN_KEY) token?: string,
  ) {
    const res = await this.cartService.deleteCartLine(dto, userId, token);
    setCookie(response, res.token);
  }
}
