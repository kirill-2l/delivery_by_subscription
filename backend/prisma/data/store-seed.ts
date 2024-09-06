import { Seeder } from "./Seeder";
import { Store } from "@prisma/client";
import { faker } from "@faker-js/faker";

export class StoreSeed extends Seeder<Partial<Store>> {
  constructor(count: number = 3) {
    super(count);
    this.count = count;
    this.createData();
  }

  protected createData() {
    for (let i = 0; i < this.count; i++) {
      this._data.push({
        name: faker.company.name(),
        // id: i + 1,
      });
    }
  }
}
