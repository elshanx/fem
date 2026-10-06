const PLACEHOLDERS = 6;

export default function JobListSkeleton() {
  return (
    <div role='status' aria-live='polite'>
      <span className='sr-only'>Loading jobs…</span>
      <ul
        aria-hidden='true'
        className='grid gap-y-[3.0625rem] md:grid-cols-2 md:gap-x-[0.6875rem] md:gap-y-[4.0625rem] xl:grid-cols-3 xl:gap-x-[1.875rem]'
      >
        {Array.from({ length: PLACEHOLDERS }, (_, i) => (
          <li
            key={i}
            className='relative flex min-h-[14.25rem] animate-pulse-soft flex-col gap-4 rounded-md bg-white px-8 pt-[3.0625rem] pb-8 dark:bg-very-dark-blue'
          >
            <span className='absolute -top-[1.5625rem] left-8 size-[3.125rem] rounded-[0.9375rem] bg-light-grey dark:bg-midnight' />
            <span className='h-4 w-32 rounded bg-light-grey dark:bg-midnight' />
            <span className='h-5 w-48 rounded bg-light-grey dark:bg-midnight' />
            <span className='h-4 w-24 rounded bg-light-grey dark:bg-midnight' />
            <span className='mt-auto h-4 w-28 rounded bg-light-grey dark:bg-midnight' />
          </li>
        ))}
      </ul>
    </div>
  );
}
