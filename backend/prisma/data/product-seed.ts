import { Seeder } from "./Seeder";
import { faker } from "@faker-js/faker";
import { Product } from "@prisma/client";

export class ProductSeed extends Seeder<Partial<Product>> {
  constructor(count: number = 10) {
    super(count);
    this.createData();
  }

  createData() {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price({ dec: 0 })),
        // storeId: faker.number.int({ min: 1, max: 3 }),
      });
    }
  }
}
