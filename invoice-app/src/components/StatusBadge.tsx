import type { Status } from '@/lib/invoice';

const styles: Record<Status, string> = {
  paid: 'bg-paid/6 text-paid',
  pending: 'bg-pending/6 text-pending',
  draft: 'bg-slate/6 text-slate dark:bg-lavender/6 dark:text-lavender',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex h-10 w-26 items-center justify-center gap-2 rounded-md text-heading-s font-bold capitalize ${styles[status]}`}
    >
      <span aria-hidden='true' className='size-2 rounded-full bg-current' />
      {status}
    </span>
  );
}
