import { hashSync } from "bcrypt";
import { PrismaClient, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function up() {
  await prisma.user.deleteMany();
  console.log("Deleted records in users table");
  await prisma.store.deleteMany();
  console.log("Deleted stores in users table");
  await prisma.product.deleteMany();
  console.log("Deleted products in users table");
  await prisma.category.deleteMany();
  console.log("Deleted categories in users table");

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

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  const categories = [];
  const categoriesCount = 10;
  const categoryNames = faker.helpers.uniqueArray(faker.commerce.department, categoriesCount);

  for (const index of [...Array(categoriesCount)].keys()) {
    categories.push(
      await prisma.category.create({
        data: {
          name: categoryNames[index],
        },
      }),
    );
  }

  const stores = [];
  const storesCount = 50;
  const storeNames = faker.helpers.uniqueArray(faker.company.name, storesCount);

  for (const index of [...Array(storesCount)].keys()) {
    stores.push(
      await prisma.store.create({
        data: {
          name: storeNames[index],
          storeCoverImageSrc: faker.image.urlPicsumPhotos({
            width: 1200,
            height: 300,
          }),
        },
      }),
    );
  }

  const products = [];
  const productPerStore = 100;

  for (const store of stores) {
    for (const _ of [...Array(productPerStore)]) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.department(),
          price: Number(faker.commerce.price({ dec: 0 })),
          productImageSrc: faker.image.urlPicsumPhotos({
            width: 400,
            height: 400,
          }),
          store: {
            connect: {
              id: store.id,
            },
          },
        },
      });
      await prisma.categoryOnProducts.create({
        data: {
          product: {
            connect: {
              id: product.id,
            },
          },
          category: {
            connect: {
              id: Math.floor(Math.random() * (categoriesCount - 1) + 1),
            },
          },
        },
      });
      products.push(product);
    }
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
