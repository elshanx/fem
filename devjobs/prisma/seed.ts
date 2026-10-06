import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import jobs from './jobs.json';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await prisma.$transaction(
    jobs.map(({ requirements, role, ...job }) => {
      const data = {
        ...job,
        requirementsContent: requirements.content,
        requirementsItems: requirements.items,
        roleContent: role.content,
        roleItems: role.items,
      };
      return prisma.job.upsert({ where: { id: job.id }, create: data, update: data });
    })
  );
  // eslint-disable-next-line no-console -- CLI script output
  console.log(`Seeded ${jobs.length} jobs`);
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console -- CLI script output
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
