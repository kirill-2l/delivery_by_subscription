import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Cart, CartItem, Category, Product } from "@prisma/client";
import { DeleteSingleProductDto } from "./dto/delete-single-product.dto";
import { UserID } from "../user/types";
import { DeleteCartItemDto } from "./dto/delete-cart-item.dto";

type ProductWithCategory = Product & {
  category: {
    category: Category;
  };
};

type CartItemWithProductAndCategory = CartItem & {
  product: ProductWithCategory;
};

type CartWithItems = Cart & {
  items: CartItemWithProductAndCategory[];
};

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  private mapCartItemProduct(items: CartItemWithProductAndCategory[]) {
    return items.map(item => {
      return {
        ...item,
        product: {
          id: item.product.id,
          name: item.product.name,
          categoryName: item.product.category.category.name,
          categoryId: item.product.category.category.id,
          price: item.product.price,
          description: item.product.description,
          productImageSrc: item.product.productImageSrc,
          productType: item.product.productType,
        },
      };
    });
  }

  private calcTotalAmount(cartItems: CartItemWithProductAndCategory[]) {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  private async getCart(userId: UserID) {
    const cartInclude = {
      items: {
        include: {
          product: {
            include: {
              category: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      },
    };

    let cart = await this.prisma.cart.findFirst({
      where: {
        userId,
      },
      include: cartInclude,
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          totalAmount: 0,
          userId,
        },
        include: cartInclude,
      });
    }

    return cart;
  }

  private async formatCart(cart: CartWithItems) {
    return {
      id: cart.id,
      items: this.mapCartItemProduct(cart.items),
      totalAmount: this.calcTotalAmount(cart.items),
    };
  }

  async getUserCart(userId: UserID) {
    const cart = await this.getCart(userId);
    return {
      id: cart.id,
      items: this.mapCartItemProduct(cart.items),
      totalAmount: this.calcTotalAmount(cart.items),
    };
  }

  async addProduct(userId: number, { productId }: CreateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) throw new ForbiddenException("Product not found");

    const currentCart = await this.getCart(userId);

    const findCartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: currentCart.id,
        productId,
      },
    });

    if (findCartItem) {
      await this.prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: currentCart.id,
          productId,
          quantity: 1,
        },
      });
    }

    const cart = await this.getCart(userId);

    return this.formatCart(cart);
  }

  async deleteCartItem(userId: UserID, { cartItemId }: DeleteCartItemDto) {
    const cart = await this.getCart(userId);
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    if (!cartItem) throw new ForbiddenException("Product not found");

    const item = await this.prisma.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },

      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    if (item.quantity <= 0) {
      await this.prisma.cartItem.delete({
        where: {
          id: cartItemId,
          cartId: cart.id,
        },
      });
    }

    return this.formatCart(await this.getCart(userId));
  }

  async deleteCartLine(userId: UserID, { productId }: DeleteSingleProductDto) {
    const cart = await this.getCart(userId);
    const cartItem = this.prisma.cartItem.findFirst({
      where: {
        productId,
        cartId: cart.id,
      },
    });

    if (!cartItem) throw new ForbiddenException("Product not found");

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId: productId,
      },
    });

    return this.formatCart(await this.getCart(userId));
  }
}
