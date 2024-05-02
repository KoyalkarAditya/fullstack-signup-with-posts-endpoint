import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const a = await prisma.user.upsert({
    where: { email: "aditya@gmail.com" },
    update: {},
    create: {
      email: "aditya@gmail.com",
      password: "11111111",
      name: "aditya",
      posts: {
        create: Array.from({ length: 20 }, (_, index) => ({
          title: `Post ${index + 1}`,
          content: `This is content for post ${index + 1}`,
          published: true,
        })),
      },
    },
  });
  const b = await prisma.user.upsert({
    where: { email: "tinku@gmail.com" },
    update: {},
    create: {
      email: "tinku@gmail.com",
      password: "22222222",
      name: "tinku",
      posts: {
        create: Array.from({ length: 20 }, (_, index) => ({
          title: `Post ${index + 1}`,
          content: `This is content for post ${index + 21}`,
          published: true,
        })),
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
