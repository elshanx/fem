import 'server-only';
import prisma from '@/lib/db';
import { ID_PATTERN, invoiceTotal, type Status } from '@/lib/invoice';

export async function listInvoices(statuses: Status[]) {
  const rows = await prisma.invoice.findMany({
    where: statuses.length ? { status: { in: statuses } } : {},
    orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
    select: {
      id: true,
      paymentDue: true,
      clientName: true,
      status: true,
      items: { select: { quantity: true, priceCents: true } },
    },
  });
  return rows.map(({ items, ...row }) => ({ ...row, total: invoiceTotal(items) }));
}

export function getInvoice(id: string) {
  return ID_PATTERN.test(id)
    ? prisma.invoice.findUnique({
        where: { id },
        include: { items: { orderBy: { position: 'asc' } } },
      })
    : null;
}

export type Invoice = NonNullable<Awaited<ReturnType<typeof getInvoice>>>;
export type InvoiceSummary = Awaited<ReturnType<typeof listInvoices>>[number];
