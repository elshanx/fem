'use client';

import Form from 'next/form';
import { useRef, useSyncExternalStore } from 'react';
import { Check, FilterIcon, Location, Search } from '@/common/icons';
import type { JobFilters } from '@/lib/filters';

const field =
  'h-full w-full bg-transparent text-body text-very-dark-blue caret-violet outline-none placeholder:text-very-dark-blue/50 dark:text-white dark:placeholder:text-white/50';

const DESKTOP_QUERY = '(min-width: 90rem)';

const subscribeDesktop = (onChange: () => void) => {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
};

export default function SearchForm({ filters }: { filters: JobFilters }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );

  return (
    <Form
      action='/'
      scroll={false}
      onSubmit={() => dialogRef.current?.close()}
      role='search'
      aria-label='Filter jobs'
      className='relative z-10 container-page -mt-10'
    >
      <div className='flex h-20 items-center rounded-md bg-white pr-4 pl-6 md:pr-4 md:pl-6 xl:pl-8 dark:bg-very-dark-blue'>
        <label
          htmlFor='search-title'
          className='flex h-full flex-1 items-center gap-4 md:border-r md:border-dark-grey/20 md:pr-4'
        >
          <Search className='hidden shrink-0 text-violet md:block' />
          <span className='sr-only'>Filter by title, company or expertise</span>
          <input
            id='search-title'
            name='title'
            defaultValue={filters.title}
            maxLength={100}
            placeholder={isDesktop ? 'Filter by title, companies, expertise…' : 'Filter by title…'}
            className={field}
          />
        </label>

        <button
          type='button'
          onClick={() => dialogRef.current?.showModal()}
          aria-label='More filters'
          aria-haspopup='dialog'
          className='mr-6 cursor-pointer rounded-sm text-dark-grey focus-ring md:hidden dark:text-white'
        >
          <FilterIcon />
        </button>
        <button type='submit' aria-label='Search' className='btn-primary size-12 px-0 md:hidden'>
          <Search className='text-white' />
        </button>

        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <dialog
          id='search-filters'
          ref={dialogRef}
          aria-label='Filters'
          onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
          className='m-auto w-[calc(100%-3rem)] max-w-81.75 rounded-md bg-white p-0 backdrop:bg-black/50 md:contents dark:bg-very-dark-blue'
        >
          <label
            htmlFor='search-location'
            className='flex h-18 items-center gap-4 border-b border-dark-grey/20 px-6 md:h-full md:w-57.5 md:border-r md:border-b-0 xl:w-75 xl:px-6'
          >
            <Location className='shrink-0' />
            <span className='sr-only'>Filter by location</span>
            <input
              id='search-location'
              name='location'
              defaultValue={filters.location}
              maxLength={100}
              placeholder='Filter by location…'
              className={field}
            />
          </label>

          <div className='flex flex-col gap-6 p-6 md:flex-row md:items-center md:gap-7 md:p-0 md:pl-5 xl:gap-6.75 xl:pl-8'>
            <label
              htmlFor='search-full-time'
              className='group flex cursor-pointer items-center gap-4 text-body font-bold text-very-dark-blue dark:text-white'
            >
              <span className='relative grid size-6 shrink-0 place-items-center'>
                <input
                  id='search-full-time'
                  type='checkbox'
                  name='fullTime'
                  defaultChecked={filters.fullTime}
                  className='peer size-6 cursor-pointer appearance-none rounded-[0.1875rem] bg-very-dark-blue/10 focus-ring transition-colors group-hover:bg-violet/25 checked:bg-violet dark:bg-white/10 dark:checked:bg-violet'
                />
                <Check className='pointer-events-none absolute hidden peer-checked:block' />
              </span>
              <span>
                Full Time<span className='md:hidden xl:inline'> Only</span>
              </span>
            </label>
            <button type='submit' className='btn-primary w-full md:w-20 md:px-0 xl:w-30.75'>
              Search
            </button>
          </div>
        </dialog>
      </div>
    </Form>
  );
}
