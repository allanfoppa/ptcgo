import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding');

  // Result table
  await prisma.result.createMany({
    data: [
      { id: 0, name: 'loss' },
      { id: 1, name: 'win' },
    ],
    skipDuplicates: true, // Avoid duplicate entries
  });

  // Format table
  await prisma.format.createMany({
    data: [
      { id: 0, name: 'standard' },
      { id: 1, name: 'expanded' },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
