import Image from 'next/image';

export default function EmptyState() {
  return (
    <div className='mx-auto mt-25 max-w-55 text-center md:mt-52'>
      <Image
        src='/illustration-empty.svg'
        alt=''
        width={242}
        height={200}
        priority
        className='mx-auto h-auto w-48 md:w-60'
      />
      <h2 className='mt-10 text-heading-m md:mt-16'>There is nothing here</h2>
      <p className='mt-6 text-gray dark:text-lavender'>
        Create an invoice by clicking the{' '}
        <strong className='font-bold'>
          New <span className='hidden md:inline'>Invoice</span>
        </strong>{' '}
        button and get started
      </p>
    </div>
  );
}
