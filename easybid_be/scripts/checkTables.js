const { PrismaClient } = require('../src/generated/prisma');

async function main() {
  const prisma = new PrismaClient();
  try {
    const result = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
    console.log(result);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
