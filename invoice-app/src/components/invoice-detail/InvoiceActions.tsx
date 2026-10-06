import Link from 'next/link';
import { markAsPaid } from '@/app/actions';
import DeleteButton from '@/components/invoice-detail/DeleteButton';
import SubmitButton from '@/components/SubmitButton';
import type { Invoice } from '@/lib/invoices';

export default function InvoiceActions({ invoice }: { invoice: Invoice }) {
  return (
    <>
      <Link href={`/invoice/${invoice.id}?edit`} scroll={false} className='btn-light'>
        Edit
      </Link>
      <DeleteButton id={invoice.id} />
      {invoice.status === 'pending' && (
        <form action={markAsPaid}>
          <input type='hidden' name='id' value={invoice.id} />
          <SubmitButton className='btn-primary'>Mark as Paid</SubmitButton>
        </form>
      )}
    </>
  );
}
