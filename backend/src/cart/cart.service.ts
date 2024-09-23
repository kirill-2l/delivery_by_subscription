import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Cart, CartItem, Category, Product } from "@prisma/client";
import { DeleteSingleProductDto } from "./dto/delete-single-product.dto";
import { UserID } from "../user/types";
import { DeleteCartItemDto } from "./dto/delete-cart-item.dto";
import { UuidService } from "../common/uuid.service";
import { UserService } from "../user/user.service";
import { ProductService } from "../product/product.service";

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

const CART_PRISMA_INCLUDE = {
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

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uuid: UuidService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  private mapCartItemProduct(items: CartItemWithProductAndCategory[]) {
    return items.map(item => {
      return {
        id: item.id,
        quantity: item.quantity,
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

  private async findOrCreateCart(userId?: UserID, token?: string) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
          { user: { id: userId } },
        ],
      },
      include: CART_PRISMA_INCLUDE,
    });

    if (!cart) {
      const user = userId ? await this.userService.findById(userId) : null;

      if (!token) {
        token = this.uuid.generateUuid();
      }

      if (user) {
        return this.prisma.cart.create({
          data: {
            user: {
              connect: {
                id: user?.id,
              },
            },
            token,
            items: {},
          },
          include: CART_PRISMA_INCLUDE,
        });
      }
      return this.prisma.cart.create({
        data: {
          token,
          items: {},
        },
        include: CART_PRISMA_INCLUDE,
      });
    }
    return cart;
  }

  private async formatCart(cart: CartWithItems) {
    return {
      token: cart.token,
      id: cart.id,
      items: this.mapCartItemProduct(cart.items),
      totalAmount: this.calcTotalAmount(cart.items),
    };
  }

  async getUserCart(userId?: UserID, token?: string) {
    return this.formatCart(await this.findOrCreateCart(userId, token));
  }

  async addProduct(userId: number, { productId }: CreateProductDto, token) {
    const product = await this.productService.findById(productId);

    if (!product) throw new ForbiddenException("Product not found");

    const currentCart = await this.findOrCreateCart(userId, token);
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: currentCart.id,
        productId,
      },
    });

    if (cartItem) {
      await this.prisma.cartItem.update({
        where: {
          id: cartItem.id,
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

    const cart = await this.findOrCreateCart(userId, token);

    return this.formatCart(cart);
  }

  async deleteCartItem({ cartItemId }: DeleteCartItemDto, userId: UserID, token?: string) {
    const cart = await this.findOrCreateCart(userId, token);
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

    return this.formatCart(await this.findOrCreateCart(userId, token));
  }

  async deleteCartLine({ productId }: DeleteSingleProductDto, userId: UserID, token: string) {
    if (!userId && !token) throw new ForbiddenException("Not authorized and no cart token");
    const cart = await this.findOrCreateCart(userId, token);
    const cartItem = await this.prisma.cartItem.findFirst({
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

    return this.formatCart(await this.findOrCreateCart(userId, token));
  }
}
