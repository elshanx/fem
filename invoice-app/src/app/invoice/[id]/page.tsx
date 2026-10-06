import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { ArrowLeft } from '@/common/icons';
import InvoiceActions from '@/components/invoice-detail/InvoiceActions';
import InvoiceDetails from '@/components/invoice-detail/InvoiceDetails';
import InvoiceForm from '@/components/invoice-form/InvoiceForm';
import StatusBadge from '@/components/StatusBadge';
import { toIsoDate, type InvoiceInput } from '@/lib/invoice';
import { getInvoice, type Invoice } from '@/lib/invoices';

const loadInvoice = cache(async (id: string) => (await getInvoice(id)) ?? notFound());

export async function generateMetadata({ params }: PageProps<'/invoice/[id]'>): Promise<Metadata> {
  const invoice = await loadInvoice((await params).id);
  return { title: `Invoice #${invoice.id}` };
}

const toFormValues = ({ items, createdAt, paymentTerms, ...invoice }: Invoice) =>
  ({
    ...invoice,
    createdAt: toIsoDate(createdAt),
    paymentTerms: String(paymentTerms),
    items: items.map((item) => ({
      name: item.name,
      quantity: String(item.quantity),
      price: (item.priceCents / 100).toFixed(2),
    })),
  }) satisfies InvoiceInput & { id: string };

export default async function InvoicePage({ params, searchParams }: PageProps<'/invoice/[id]'>) {
  const invoice = await loadInvoice((await params).id);
  const editing = 'edit' in (await searchParams);

  return (
    <>
      <main className='mx-auto max-w-182.5 px-6 pt-8 pb-14 md:px-12 md:pt-12 lg:px-0 lg:pt-16'>
        <Link
          href='/'
          className='inline-flex items-center gap-6 rounded-sm text-heading-s font-bold text-ink focus-ring transition-colors hover:text-gray-blue dark:text-white dark:hover:text-gray'
        >
          <ArrowLeft /> Go back
        </Link>

        <section
          aria-label='Status'
          className='mt-8 flex items-center justify-between card px-6 py-6 md:justify-start md:gap-5 md:px-8 md:py-5'
        >
          <span className='text-gray dark:text-lavender'>Status</span>
          <StatusBadge status={invoice.status} />
          <div className='ml-auto hidden gap-2 md:flex'>
            <InvoiceActions invoice={invoice} />
          </div>
        </section>

        <InvoiceDetails invoice={invoice} />
      </main>

      <div className='sticky bottom-0 flex justify-center gap-2 bg-white px-6 py-5 md:hidden dark:bg-navy-900'>
        <InvoiceActions invoice={invoice} />
      </div>

      {editing && (
        <InvoiceForm
          closeHref={`/invoice/${invoice.id}`}
          today={toIsoDate(new Date())}
          invoice={toFormValues(invoice)}
        />
      )}
    </>
  );
}
