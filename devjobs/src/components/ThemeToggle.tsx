'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from '@/common/icons';

const subscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser; render a neutral switch on the server.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div className='flex items-center gap-4'>
      <Sun />
      <button
        type='button'
        role='switch'
        aria-checked={isDark}
        aria-label='Dark mode'
        disabled={!mounted}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className='group flex h-6 w-12 cursor-pointer items-center rounded-full bg-white px-[0.3125rem] focus-ring focus-visible:outline-white'
      >
        <span
          className={`size-3.5 rounded-full bg-violet transition-transform group-hover:bg-light-violet ${isDark ? 'translate-x-6' : ''}`}
        />
      </button>
      <Moon />
    </div>
  );
}
