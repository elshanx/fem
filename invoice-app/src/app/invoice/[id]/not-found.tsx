import Link from 'next/link';

export default function InvoiceNotFound() {
  return (
    <main className='mx-auto mt-24 max-w-182.5 px-6 text-center'>
      <h1 className='text-heading-m md:text-heading-l'>Invoice not found</h1>
      <p className='mt-4'>This invoice doesn&apos;t exist or has been deleted.</p>
      <Link href='/' className='mt-8 btn-primary'>
        Back to invoices
      </Link>
    </main>
  );
}
