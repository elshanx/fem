import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type Status } from '../src/generated/prisma/client';
import { parseDate, toCents } from '../src/lib/invoice';
import invoices from './data.json';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  await prisma.$transaction(
    invoices.map(({ id, senderAddress: s, clientAddress: c, items, total, ...invoice }) => {
      const data = {
        ...invoice,
        status: invoice.status as Status,
        createdAt: parseDate(invoice.createdAt),
        paymentDue: parseDate(invoice.paymentDue),
        senderStreet: s.street,
        senderCity: s.city,
        senderPostCode: s.postCode,
        senderCountry: s.country,
        clientStreet: c.street,
        clientCity: c.city,
        clientPostCode: c.postCode,
        clientCountry: c.country,
      };
      const itemRows = items.map((item, position) => ({
        position,
        name: item.name,
        quantity: item.quantity,
        priceCents: toCents(item.price),
      }));
      return prisma.invoice.upsert({
        where: { id },
        create: { id, ...data, items: { create: itemRows } },
        update: { ...data, items: { deleteMany: {}, create: itemRows } },
      });
    })
  );
  // eslint-disable-next-line no-console -- CLI script output
  console.log(`Seeded ${invoices.length} invoices`);
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console -- CLI script output
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
