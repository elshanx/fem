import Link from 'next/link';
import { ViewTransition } from 'react';
import CompanyLogo from '@/components/CompanyLogo';
import JobMeta from '@/components/JobMeta';
import type { Job } from '@/lib/jobs';

type Props = Pick<
  Job,
  'id' | 'company' | 'logo' | 'logoBackground' | 'position' | 'postedAt' | 'contract' | 'location'
>;

export default function JobCard(props: Props) {
  const { id, company, logo, logoBackground, position, postedAt, contract, location } = props;

  return (
    <article className='group relative flex h-full min-h-[14.25rem] flex-col rounded-md bg-white px-8 pt-[3.0625rem] pb-8 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-violet dark:bg-very-dark-blue'>
      <ViewTransition name={`logo-${id}`} share='morph' default='none'>
        <CompanyLogo
          logo={logo}
          background={logoBackground}
          className='absolute -top-[1.5625rem] left-8 size-[3.125rem] rounded-[0.9375rem]'
        />
      </ViewTransition>
      <JobMeta postedAt={postedAt} contract={contract} />
      <ViewTransition name={`title-${id}`} share='morph' default='none'>
        <h2 className='mt-4 text-h3 font-bold text-very-dark-blue transition-colors group-hover:text-dark-grey dark:text-white dark:group-hover:text-dark-grey'>
          <Link
            href={`/job/${id}`}
            transitionTypes={['nav-forward']}
            className='outline-none after:absolute after:inset-0 after:rounded-md'
          >
            {position}
          </Link>
        </h2>
      </ViewTransition>
      <p className='mt-4'>{company}</p>
      <p className='mt-auto pt-8 text-h4 font-bold text-violet'>{location}</p>
    </article>
  );
}
