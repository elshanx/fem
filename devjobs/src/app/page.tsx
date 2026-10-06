import { Suspense, ViewTransition } from 'react';
import JobListSkeleton from '@/components/JobListSkeleton';
import JobResults from '@/components/JobResults';
import PageTransition from '@/components/PageTransition';
import SearchForm from '@/components/SearchForm';
import { parseFilters, toQueryString } from '@/lib/filters';

export default async function Home({ searchParams }: PageProps<'/'>) {
  const filters = parseFilters(await searchParams);
  // Identifies the search without the page number: Load More keeps the list, a new search resets it.
  const filterKey = toQueryString({ ...filters, page: 1 });

  return (
    <PageTransition>
      <main className='pb-16 md:pb-[3.875rem] xl:pb-26'>
        {/* Remount when the filters change so the inputs show the current URL's values. */}
        <SearchForm key={filterKey} filters={filters} />

        <div className='container-page mt-[3.5625rem] md:mt-[4.375rem] xl:mt-[6.5625rem]'>
          <h1 className='sr-only'>Developer jobs</h1>
          {/* A new search shows the skeleton right away, then reveals the results. */}
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
