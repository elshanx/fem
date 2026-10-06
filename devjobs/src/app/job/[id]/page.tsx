import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import CompanyLogo from '@/components/CompanyLogo';
import JobMeta from '@/components/JobMeta';
import { getJob } from '@/lib/jobs';

// generateMetadata and the page share one query per request.
const loadJob = cache(async (id: string) => (await getJob(Number(id))) ?? notFound());

const displayUrl = (url: string) => url.replace(/^https?:\/\//, '');

export async function generateMetadata({ params }: PageProps<'/job/[id]'>): Promise<Metadata> {
  const job = await loadJob((await params).id);
  return { title: `${job.position} at ${job.company}`, description: job.description };
}

export default async function JobPage({ params }: PageProps<'/job/[id]'>) {
  const job = await loadJob((await params).id);
  const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

  return (
    <>
      <main className='container-page max-w-[45.625rem] xl:px-0'>
        {/* Company bar */}
        <section
          aria-label={job.company}
          className='relative -mt-4 flex flex-col items-center rounded-md bg-white px-6 pt-[3.0625rem] pb-8 text-center md:-mt-10 md:h-[8.75rem] md:flex-row md:p-0 md:pr-10 md:text-left dark:bg-very-dark-blue'
        >
          <CompanyLogo
            logo={job.logo}
            background={job.logoBackground}
            className='absolute -top-[1.5625rem] size-[3.125rem] rounded-[0.9375rem] md:static md:size-[8.75rem] md:rounded-none md:rounded-bl-md'
            logoClassName='md:scale-[2]'
          />
          <div className='md:ml-10 md:flex-1'>
            <h2 className='text-h3 font-bold text-very-dark-blue md:text-h2 dark:text-white'>
              {job.company}
            </h2>
            <p className='mt-[0.8125rem] md:mt-[0.8125rem]'>{displayUrl(job.website)}</p>
          </div>
          <a href={job.website} {...external} className='mt-[1.6875rem] btn-secondary md:mt-0'>
            Company Site
          </a>
        </section>

        {/* Job details */}
        <article className='mt-6 rounded-md bg-white px-6 py-10 md:mt-8 md:p-12 dark:bg-very-dark-blue'>
          <header className='flex flex-col gap-[3.125rem] md:flex-row md:items-center md:justify-between md:gap-4'>
            <div>
              <JobMeta postedAt={job.postedAt} contract={job.contract} />
              <h1 className='mt-2 text-h3 font-bold text-very-dark-blue md:text-h1 dark:text-white'>
                {job.position}
              </h1>
              <p className='mt-2 text-h4 font-bold text-violet'>{job.location}</p>
            </div>
            <a href={job.apply} {...external} className='btn-primary w-full md:w-auto'>
              Apply Now
            </a>
          </header>

          <p className='mt-8 md:mt-10'>{job.description}</p>

          <h2 className='mt-10 text-h3 font-bold text-very-dark-blue dark:text-white'>
            Requirements
          </h2>
          <p className='mt-7'>{job.requirementsContent}</p>
          <ul className='mt-8 space-y-2 pl-1 marker:text-violet'>
            {job.requirementsItems.map((item) => (
              <li key={item} className='ml-3 list-disc pl-8'>
                {item}
              </li>
            ))}
          </ul>

          <h2 className='mt-10 text-h3 font-bold text-very-dark-blue dark:text-white'>
            What You Will Do
          </h2>
          <p className='mt-7'>{job.roleContent}</p>
          <ol className='mt-8 space-y-2 marker:font-bold marker:text-violet'>
            {job.roleItems.map((item) => (
              <li key={item} className='ml-3 list-decimal pl-8'>
                {item}
              </li>
            ))}
          </ol>
        </article>
      </main>

      {/* Sticky-style footer bar from the design */}
      <footer className='mt-16 bg-white py-6 md:mt-[3.3125rem] dark:bg-very-dark-blue'>
        <div className='container-page flex max-w-[45.625rem] items-center justify-between gap-4 xl:px-0'>
          <div className='hidden md:block'>
            <p className='text-h3 font-bold text-very-dark-blue dark:text-white'>{job.position}</p>
            <p className='mt-3'>{job.company}</p>
          </div>
          <a href={job.apply} {...external} className='btn-primary w-full md:w-auto'>
            Apply Now
          </a>
        </div>
      </footer>
    </>
  );
}
