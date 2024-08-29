import { hashSync } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function up() {
  await prisma.user.createMany({
    data: [
      {
        name: "User",
        email: "user@user.com",
        hash: hashSync("111111", 10),
        role: "USER",
      },
      {
        name: "Admin",
        email: "admin@admin.com",
        hash: hashSync("111111", 10),
        role: "ADMIN",
      },
      {
        name: "Manager",
        email: "manager@manager.com",
        hash: hashSync("111111", 10),
        role: "MANAGER",
      },
    ],
  });
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
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
