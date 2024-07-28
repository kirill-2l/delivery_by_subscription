// import { PrismaClient, User } from "@prisma/client";
// import { faker } from "@faker-js/faker";
// import * as bcrypt from "bcrypt";
//
// const categories = [
//   "Lunch",
//   "Salads",
//   "Soup",
//   "Pasta",
//   "Vareniki",
//   "Pancakes",
//   "Hot dishes",
//   "Meaty",
//   "Fish",
//   "Dessert",
// ];
//
// export async function createRandomUser(): Promise<Partial<User>> {
//   const firstName = faker.person.firstName();
//   const lastName = faker.person.lastName();
//   return {
//     email: faker.internet.email({ firstName, lastName, provider: "fake-corp.com" }),
//     hash: await bcrypt.hash("1111", 12),
//   };
// }
//
// async function main() {
//   const prisma = new PrismaClient();
//
//   // clean db
//   await prisma.$transaction([prisma.product.deleteMany(), prisma.category.deleteMany(), prisma.user.deleteMany()]);
//
//   // create categories
//   for (const dep of categories) {
//     await prisma.category.create({
//       data: {
//         name: dep,
//         user: "1",
//       },
//     });
//   }
//
//   // create admin
//   const dbDepartments = await prisma.department.findMany();
//   for (const dbDep of dbDepartments) {
//     await prisma.department.update({
//       where: {
//         id: dbDep.id,
//       },
//       data: {
//         usersLink: {
//           create: {
//             role: "ADMIN",
//             jobTitle: "CEO",
//             assignedBy: "system",
//             user: {
//               connectOrCreate: {
//                 create: {
//                   username: "terry.colby@e-corp.com",
//                   fullName: "Terry Colby",
//                   contactInfo: faker.phone.number("(###) ###-####"),
//                   password: await bcrypt.hash("pwned"),
//                   salary: "200000",
//                 },
//                 where: {
//                   username: "terry.colby@e-corp.com",
//                 },
//               },
//             },
//           },
//         },
//       },
//     });
//   }
//
//   // create manager
//   const eCoinDep = dbDepartments.find(dep => dep.name === "E Coin");
//   await prisma.user.create({
//     data: {
//       username: "tyrell.wellick@e-corp.com",
//       password: await bcrypt.hash("pwned"),
//       fullName: "Tyrell Wellick",
//       salary: "120000",
//       contactInfo: faker.phone.number("(###) ###-####"),
//       departmentsLink: {
//         create: {
//           role: "MANAGER",
//           jobTitle: "Department Manager",
//           assignedBy: "system",
//           departmentId: eCoinDep.id,
//         },
//       },
//     },
//   });
//
//   // create users
//   for (let i = 0; i <= 100; ++i) {
//     const userData = await createRandomUser();
//     await prisma.userDepartmentLink.create({
//       data: {
//         user: {
//           create: {
//             fullName: userData.fullName,
//             username: userData.username,
//             password: userData.password,
//             salary: userData.workerRecord.salary,
//             contactInfo: userData.workerRecord.contactInfo,
//           },
//         },
//         role: "USER",
//         jobTitle: userData.workerRecord.jobTitle,
//         assignedBy: "system",
//         department: {
//           connect: {
//             name: userData.workerRecord.department,
//           },
//         },
//       },
//     });
//   }
// }
//
// main();
