import type { CSSProperties } from 'react';
import JobCard from '@/components/JobCard';
import LoadMoreLink from '@/components/LoadMoreLink';
import { PAGE_SIZE, toQueryString, type JobFilters } from '@/lib/filters';
import { findJobs } from '@/lib/jobs';

export default async function JobResults({ filters }: { filters: JobFilters }) {
  const { jobs, hasMore } = await findJobs(filters);

  if (!jobs.length) {
    return (
      <p role='status' className='py-16 text-center text-h3 text-very-dark-blue dark:text-white'>
        No jobs match your search.
      </p>
    );
  }

  return (
    <>
      <ul className='grid gap-y-[3.0625rem] md:grid-cols-2 md:gap-x-[0.6875rem] md:gap-y-[4.0625rem] xl:grid-cols-3 xl:gap-x-[1.875rem]'>
        {jobs.map((job, index) => (
          <li
            key={job.id}
            className='card-in'
            style={{ '--i': index % PAGE_SIZE } as CSSProperties}
          >
            <JobCard {...job} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <LoadMoreLink href={`/${toQueryString({ ...filters, page: filters.page + 1 })}`} />
      )}
    </>
  );
}
