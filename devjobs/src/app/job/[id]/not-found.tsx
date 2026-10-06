import Link from 'next/link';

export default function JobNotFound() {
  return (
    <main className='container-page mt-16 max-w-[45.625rem] text-center xl:px-0'>
      <h1 className='text-h1 font-bold text-very-dark-blue dark:text-white'>Job not found</h1>
      <p className='mt-4'>This job doesn&apos;t exist or is no longer listed.</p>
      <Link href='/' className='mt-8 btn-primary'>
        Back to all jobs
      </Link>
    </main>
  );
}
