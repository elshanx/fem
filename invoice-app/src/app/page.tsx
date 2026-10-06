import Link from 'next/link';
import { Plus } from '@/common/icons';
import InvoiceForm from '@/components/invoice-form/InvoiceForm';
import EmptyState from '@/components/invoice-list/EmptyState';
import InvoiceRow from '@/components/invoice-list/InvoiceRow';
import StatusFilter from '@/components/invoice-list/StatusFilter';
import { parseStatuses, toIsoDate } from '@/lib/invoice';
import { listInvoices } from '@/lib/invoices';

export default async function InvoicesPage({ searchParams }: PageProps<'/'>) {
  const params = await searchParams;
  const statuses = parseStatuses(params.status);
  const invoices = await listInvoices(statuses);
  const filterQuery = statuses.length ? `status=${statuses.join(',')}` : '';
  const count = invoices.length;
  const label = statuses.length ? statuses.join('/') : 'total';

  return (
    <main className='mx-auto max-w-182.5 px-6 pt-8 pb-26 md:px-12 md:pt-14 lg:px-0 lg:pt-18'>
      <div className='flex items-center gap-4.5 md:gap-10'>
        <div className='mr-auto'>
          <h1 className='text-heading-m md:text-heading-l'>Invoices</h1>
          <p className='mt-1 md:mt-1.5'>
            {count === 0 && 'No invoices'}
            {count > 0 && (
              <>
                <span className='hidden md:inline'>There {count === 1 ? 'is' : 'are'} </span>
                {count} <span className='hidden md:inline'>{label} </span>
                invoice{count === 1 ? '' : 's'}
              </>
            )}
          </p>
        </div>
        <StatusFilter selected={statuses} />
        <Link
          href={`/?${filterQuery ? `${filterQuery}&` : ''}new`}
          scroll={false}
          className='btn-primary h-11 gap-2 pr-3.5 pl-1.5 md:h-12 md:gap-4 md:pr-4 md:pl-2'
        >
          <span className='grid size-8 place-items-center rounded-full bg-white text-violet'>
            <Plus />
          </span>
          New <span className='-ml-1.5 hidden md:-ml-3 md:inline'>Invoice</span>
        </Link>
      </div>

      {count === 0 ? (
        <EmptyState />
      ) : (
        <ul className='mt-8 space-y-4 md:mt-14 lg:mt-16'>
          {invoices.map((invoice, i) => (
            <li key={invoice.id} className='row-in' style={{ '--i': i } as React.CSSProperties}>
              <InvoiceRow invoice={invoice} />
            </li>
          ))}
        </ul>
      )}

      {'new' in params && (
        <InvoiceForm
          closeHref={filterQuery ? `/?${filterQuery}` : '/'}
          today={toIsoDate(new Date())}
        />
      )}
    </main>
  );
}
