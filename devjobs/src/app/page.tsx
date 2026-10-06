import Link from 'next/link';
import JobCard from '@/components/JobCard';
import SearchForm from '@/components/SearchForm';
import { parseFilters, toQueryString } from '@/lib/filters';
import { findJobs } from '@/lib/jobs';

export default async function Home({ searchParams }: PageProps<'/'>) {
  const filters = parseFilters(await searchParams);
  const { jobs, hasMore } = await findJobs(filters);
  const filterKey = toQueryString({ ...filters, page: 1 });

  return (
    <main className='pb-16 md:pb-[3.875rem] xl:pb-26'>
      {/* Remount when the filters change so the inputs show the current URL's values. */}
      <SearchForm key={filterKey} filters={filters} />

      <div className='container-page mt-[3.5625rem] md:mt-[4.375rem] xl:mt-[6.5625rem]'>
        <h1 className='sr-only'>Developer jobs</h1>
        {jobs.length ? (
          <ul className='grid gap-y-[3.0625rem] md:grid-cols-2 md:gap-x-[0.6875rem] md:gap-y-[4.0625rem] xl:grid-cols-3 xl:gap-x-[1.875rem]'>
            {jobs.map((job) => (
              <li key={job.id}>
                <JobCard {...job} />
              </li>
            ))}
          </ul>
        ) : (
          <p
            role='status'
            className='py-16 text-center text-h3 text-very-dark-blue dark:text-white'
          >
            No jobs match your search.
          </p>
        )}

        {hasMore && (
          <Link
            href={`/${toQueryString({ ...filters, page: filters.page + 1 })}`}
            scroll={false}
            className='mx-auto mt-8 btn-primary flex w-fit md:mt-14'
          >
            Load More
          </Link>
        )}
      </div>
    </main>
  );
}
