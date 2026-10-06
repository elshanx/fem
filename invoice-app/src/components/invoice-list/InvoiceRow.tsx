import Link from 'next/link';
import { ArrowRight } from '@/common/icons';
import StatusBadge from '@/components/StatusBadge';
import { formatDate, formatMoney, toIsoDate } from '@/lib/invoice';
import type { InvoiceSummary } from '@/lib/invoices';

export default function InvoiceRow({ invoice }: { invoice: InvoiceSummary }) {
  return (
    <Link
      href={`/invoice/${invoice.id}`}
      className='grid grid-cols-2 items-center gap-y-6 card border border-transparent p-6 focus-ring transition-colors hover:border-violet md:grid-cols-[5rem_8rem_1fr_auto_auto_auto] md:gap-x-5 md:py-4 md:pr-6 md:pl-8 lg:gap-x-8'
    >
      <span className='text-heading-s font-bold text-ink dark:text-white'>
        <span className='text-gray-blue'>#</span>
        {invoice.id}
      </span>
      <span className='text-right md:order-3 md:text-left md:whitespace-nowrap'>
        {invoice.clientName || <em className='not-italic opacity-60'>No client</em>}
      </span>
      <span className='grid gap-2 md:order-2 md:block'>
        <span>
          <span className='text-gray dark:text-lavender'>Due </span>
          <time dateTime={toIsoDate(invoice.paymentDue)}>{formatDate(invoice.paymentDue)}</time>
        </span>
        <span className='text-heading-s font-bold text-ink md:hidden dark:text-white'>
          {formatMoney(invoice.total)}
        </span>
      </span>
      <span className='justify-self-end md:order-5'>
        <StatusBadge status={invoice.status} />
      </span>
      <span className='hidden text-right text-heading-s font-bold whitespace-nowrap text-ink md:order-4 md:block dark:text-white'>
        {formatMoney(invoice.total)}
      </span>
      <ArrowRight className='hidden md:order-6 md:block' />
    </Link>
  );
}
