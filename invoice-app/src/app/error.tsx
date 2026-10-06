'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className='mx-auto mt-24 max-w-182.5 px-6 text-center'>
      <h1 className='text-heading-m md:text-heading-l'>Something went wrong</h1>
      <p className='mt-4'>We couldn&apos;t load your invoices. Please try again.</p>
      <button type='button' onClick={reset} className='mt-8 btn-primary'>
        Try again
      </button>
    </main>
  );
}
