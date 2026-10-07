'use client';

import { useTheme } from 'next-themes';
import type { MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from '@/common/icons';
import useHydrated from '@/lib/use-hydrated';

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
  const mounted = useHydrated();
  const isDark = mounted && resolvedTheme === 'dark';

  const toggle = async (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = isDark ? 'light' : 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

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
    <button
      type='button'
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      disabled={!mounted}
      onClick={toggle}
      className='-mr-2 grid size-10 cursor-pointer place-items-center rounded-full text-white focus-ring transition-opacity hover:opacity-75 [&_svg]:size-5 md:[&_svg]:size-6.5'
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
