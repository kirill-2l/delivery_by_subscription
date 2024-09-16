import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Product, Store } from "@prisma/client";

export interface StoreProductCategoryItem extends Omit<Product, "active" | "createdAt" | "updatedAt" | "storeId"> {}

export interface StoreProductCategory {
  id: number;
  name: string;
  items: StoreProductCategoryItem[];
}

export interface StoreWithProductCategories extends Pick<Store, "name" | "id" | "storeCoverImageSrc"> {
  categories: StoreProductCategory[];
}

@Injectable()
export class StoreService {
  constructor(private prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.store.findMany({
      where: {
        active: true,
      },
    });
  }

  async getStore(id: number) {
    const store = await this.prismaService.store.findFirst({
      include: {
        products: {
          include: {
            category: {
              select: {
                category: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id,
        active: true,
      },
    });

    if (!store) throw new NotFoundException("Store not found");

    const adaptCategories = () => {
      const groupedByCategoryName = store.products.reduce<
        Record<
          string,
          {
            id: number;
            items: StoreProductCategoryItem[];
          }
        >
      >((res, product) => {
        const category = product.category.category;
        const categoryName = product.category.category.name;

        if (res[categoryName]) {
          res[categoryName].items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            productImageSrc: product.productImageSrc,
            currencyName: product.currencyName,
            description: product.description,
            productType: product.productType,
          });
        } else {
          res[categoryName] = {
            id: category.id,
            items: [],
          };
        }

        return res;
      }, {});

      return Object.entries(groupedByCategoryName).map(([key, value]) => {
        return {
          name: key,
          ...value,
        };
      });
    };

    const res = {
      name: store.name,
      id: store.id,
      storeCoverImageSrc: store.storeCoverImageSrc,
      categories: adaptCategories(),
    } satisfies StoreWithProductCategories;

    return res;
  }
}
