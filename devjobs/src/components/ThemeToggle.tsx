'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from '@/common/icons';

const subscribe = () => () => {};

const REVEAL_MS = 450;

type Theme = 'light' | 'dark';

function applyThemeClass(theme: Theme) {
  // next-themes applies the class in an effect, after the view transition's
  // snapshot; set it here too so the "new" snapshot already has the theme.
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser; render a neutral switch on the server.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const isDark = mounted && resolvedTheme === 'dark';

  const toggle = async (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = isDark ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Grow a circle from the switch to the farthest corner of the viewport.
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      applyThemeClass(next);
      flushSync(() => setTheme(next));
    });
    await transition.ready;
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: REVEAL_MS, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
    );
  };

  return (
    <div className='flex items-center gap-4'>
      <Sun />
      <button
        type='button'
        role='switch'
        aria-checked={isDark}
        aria-label='Dark mode'
        disabled={!mounted}
        onClick={toggle}
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
