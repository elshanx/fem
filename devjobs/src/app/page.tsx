import { Suspense, ViewTransition } from 'react';
import JobListSkeleton from '@/components/JobListSkeleton';
import JobResults from '@/components/JobResults';
import PageTransition from '@/components/PageTransition';
import SearchForm from '@/components/SearchForm';
import { parseFilters, toQueryString } from '@/lib/filters';

export default async function Home({ searchParams }: PageProps<'/'>) {
  const filters = parseFilters(await searchParams);
  const filterKey = toQueryString({ ...filters, page: 1 });

  return (
    <PageTransition>
      <main className='pb-16 md:pb-15.5 xl:pb-26'>
        <SearchForm key={filterKey} filters={filters} />

        <div className='container-page mt-14.25 md:mt-17.5 xl:mt-26.25'>
          <h1 className='sr-only'>Developer jobs</h1>
          <Suspense
            key={filterKey}
            fallback={
              <ViewTransition exit='slide-down' default='none'>
                <JobListSkeleton />
              </ViewTransition>
            }
          >
            <ViewTransition enter='slide-up' default='none'>
              <JobResults filters={filters} />
            </ViewTransition>
          </Suspense>
        </div>
      </main>
    </PageTransition>
  );
}
