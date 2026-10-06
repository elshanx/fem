import { formatMoney, invoiceTotal, itemTotal } from '@/lib/invoice';
import type { Invoice } from '@/lib/invoices';

export default function ItemsTable({ items }: { items: Invoice['items'] }) {
  return (
    <div className='mt-10 overflow-hidden rounded-lg md:mt-12'>
      <div className='bg-ghost-blue pb-6 md:pb-8 dark:bg-navy-800'>
        <table className='w-full'>
          <thead className='sr-only md:not-sr-only'>
            <tr className='text-left text-gray-blue dark:text-lavender [&>th]:pt-8 [&>th]:font-medium'>
              <th className='pl-8'>Item Name</th>
              <th className='text-center'>QTY.</th>
              <th className='text-right'>Price</th>
              <th className='pr-8 text-right'>Total</th>
            </tr>
          </thead>
          <tbody className='text-heading-s font-bold text-ink dark:text-white'>
            {items.map((item) => (
              <tr key={item.id} className='grid grid-cols-[1fr_auto] px-6 pt-6 md:table-row'>
                <td className='md:pt-8 md:pl-8'>
                  {item.name}
                  <span className='mt-2 block text-gray-blue md:hidden dark:text-gray'>
                    {item.quantity} x {formatMoney(item.priceCents)}
                  </span>
                </td>
                <td className='hidden text-center text-gray-blue md:table-cell md:pt-8 dark:text-lavender'>
                  {item.quantity}
                </td>
                <td className='hidden text-right text-gray-blue md:table-cell md:pt-8 dark:text-lavender'>
                  {formatMoney(item.priceCents)}
                </td>
                <td className='self-center text-right md:pt-8 md:pr-8'>
                  {formatMoney(itemTotal(item))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between gap-4 bg-slate px-6 py-6 text-white md:px-8 md:py-6 dark:bg-ink'>
        <span>
          <span className='md:hidden'>Grand Total</span>
          <span className='hidden md:inline'>Amount Due</span>
        </span>
        <span className='text-heading-m font-bold'>{formatMoney(invoiceTotal(items))}</span>
      </div>
    </div>
  );
}
