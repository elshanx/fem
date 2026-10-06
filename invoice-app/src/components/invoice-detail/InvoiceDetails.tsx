import ItemsTable from '@/components/invoice-detail/ItemsTable';
import { formatDate } from '@/lib/invoice';
import type { Invoice } from '@/lib/invoices';

function Address({ street, city, postCode, country }: Record<string, string>) {
  return (
    <address className='leading-4.5 not-italic'>
      {street}
      <br />
      {city}
      <br />
      {postCode}
      <br />
      {country}
    </address>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className='font-medium text-gray-blue dark:text-lavender'>{label}</h2>
      {children}
    </div>
  );
}

const value = 'mt-3 text-heading-s font-bold text-ink dark:text-white';

export default function InvoiceDetails({ invoice }: { invoice: Invoice }) {
  return (
    <article className='mt-4 card p-6 md:mt-6 md:p-8 lg:p-12'>
      <div className='flex flex-col gap-8 md:flex-row md:justify-between'>
        <div>
          <h1 className='text-heading-s md:text-heading-s'>
            <span className='text-gray-blue'>#</span>
            {invoice.id}
          </h1>
          <p className='mt-1 md:mt-2'>{invoice.description}</p>
        </div>
        <div className='md:text-right'>
          <Address
            street={invoice.senderStreet}
            city={invoice.senderCity}
            postCode={invoice.senderPostCode}
            country={invoice.senderCountry}
          />
        </div>
      </div>

      <div className='mt-8 grid grid-cols-2 gap-x-10 gap-y-8 md:mt-5 md:grid-cols-3 lg:mt-5'>
        <div className='grid content-between gap-8'>
          <Detail label='Invoice Date'>
            <p className={value}>{formatDate(invoice.createdAt)}</p>
          </Detail>
          <Detail label='Payment Due'>
            <p className={value}>{formatDate(invoice.paymentDue)}</p>
          </Detail>
        </div>
        <Detail label='Bill To'>
          <p className={`${value} mb-2`}>{invoice.clientName}</p>
          <Address
            street={invoice.clientStreet}
            city={invoice.clientCity}
            postCode={invoice.clientPostCode}
            country={invoice.clientCountry}
          />
        </Detail>
        <div className='col-span-2 md:col-span-1'>
          <Detail label='Sent to'>
            <p className={`${value} break-all`}>{invoice.clientEmail}</p>
          </Detail>
        </div>
      </div>

      <ItemsTable items={invoice.items} />
    </article>
  );
}
