import { hashSync } from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";
import { ProductSeed } from "./data/product-seed";
import { StoreSeed } from "./data/store-seed";

const prisma = new PrismaClient();

async function up() {
  await prisma.user.deleteMany();
  console.log("Deleted records in users table");
  await prisma.store.deleteMany();
  console.log("Deleted stores in users table");
  await prisma.product.deleteMany();
  console.log("Deleted products in users table");

  const users = [
    {
      name: "User",
      email: "user@user.com",
      hash: hashSync("11111111", 10),
      role: UserRole.USER,
    },
    {
      name: "Admin",
      email: "admin@admin.com",
      hash: hashSync("11111111", 10),
      role: UserRole.ADMIN,
    },
    {
      name: "Manager",
      email: "manager@manager.com",
      hash: hashSync("11111111", 10),
      role: UserRole.MANAGER,
    },
  ];

  const products = new ProductSeed();
  const stores = new StoreSeed();

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
  await prisma.store.create({
    // @ts-expect-error test
    data: {
      ...stores.data[0],
      user: {
        connect: {
          email: "manager@manager.com",
        },
      },
    },
  });

  for (const product of products.data) {
    await prisma.product.create({
      // @ts-expect-error test
      data: {
        ...product,
        store: {
          connect: {
            id: 1,
          },
        },
      },
    });
  }
}

async function main() {
  try {
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(`There was an error while seeding: ${e}`);
    await prisma.$disconnect();
    process.exit(1);
  });
