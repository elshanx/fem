const PLACEHOLDERS = 6;

export default function JobListSkeleton() {
  return (
    <div role='status' aria-live='polite'>
      <span className='sr-only'>Loading jobs…</span>
      <ul
        aria-hidden='true'
        className='grid gap-y-12.25 md:grid-cols-2 md:gap-x-2.75 md:gap-y-16.25 xl:grid-cols-3 xl:gap-x-7.5'
      >
        {Array.from({ length: PLACEHOLDERS }, (_, i) => (
          <li
            key={i}
            className='relative flex min-h-57 animate-pulse-soft flex-col gap-4 rounded-md bg-white px-8 pt-12.25 pb-8 dark:bg-very-dark-blue'
          >
            <span className='absolute -top-6.25 left-8 size-12.5 rounded-[0.9375rem] bg-light-grey dark:bg-midnight' />
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
