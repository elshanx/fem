import { useState } from 'react';

import { applyTheme, getInitialTheme, type Theme } from '../lib/theme.ts';
import { MoonIcon, SunIcon } from './icons.tsx';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

  const handleClick = () => {
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label={`Switch to ${nextTheme} mode`}
      className='flex items-center gap-2 text-xs font-semibold sm:text-base'
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <span aria-hidden='true'>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
}
