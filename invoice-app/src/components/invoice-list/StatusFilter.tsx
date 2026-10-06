'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { ArrowDown, Check } from '@/common/icons';
import { STATUSES, type Status } from '@/lib/invoice';

export default function StatusFilter({ selected }: { selected: Status[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = (event: Event) => {
      const details = ref.current;
      if (!details?.open) return;
      if (
        event instanceof KeyboardEvent
          ? event.key === 'Escape'
          : !details.contains(event.target as Node)
      ) {
        details.open = false;
      }
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, []);

  const toggle = (status: Status) => {
    const next = selected.includes(status)
      ? selected.filter((s) => s !== status)
      : [...selected, status];
    const query = STATUSES.filter((s) => next.includes(s)).join(',');
    router.replace(query ? `${pathname}?status=${query}` : pathname, { scroll: false });
  };

  return (
    <details ref={ref} className='group relative'>
      <summary className='flex cursor-pointer list-none items-center gap-3 rounded-sm text-heading-s font-bold text-ink focus-ring md:gap-3.5 dark:text-white [&::-webkit-details-marker]:hidden'>
        <span>
          Filter<span className='hidden md:inline'> by status</span>
        </span>
        <ArrowDown className='transition-transform group-open:rotate-180' />
      </summary>
      <fieldset className='absolute top-full left-1/2 z-10 mt-6 w-48 -translate-x-1/2 space-y-4 rounded-lg bg-white p-6 shadow-menu dark:bg-navy-800 dark:shadow-[0_10px_20px_rgb(0_0_0/0.25)]'>
        <legend className='sr-only'>Filter by status</legend>
        {STATUSES.map((status) => (
          <label
            key={status}
            htmlFor={`filter-${status}`}
            className='group/option flex cursor-pointer items-center gap-3.5 text-heading-s font-bold text-ink capitalize dark:text-white'
          >
            <input
              id={`filter-${status}`}
              type='checkbox'
              checked={selected.includes(status)}
              onChange={() => toggle(status)}
              className='peer sr-only'
            />
            <span className='grid size-4 place-items-center rounded-xs border border-transparent bg-lavender transition-colors group-hover/option:border-violet peer-checked:bg-violet peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet dark:bg-navy-900 dark:peer-checked:bg-violet [&>svg]:invisible peer-checked:[&>svg]:visible'>
              <Check />
            </span>
            {status}
          </label>
        ))}
      </fieldset>
    </details>
  );
}
