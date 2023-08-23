'use client';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const switchTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`absolute right-5 top-2 w-fit rounded-md bg-light-grey p-2 duration-200 hover:scale-110 active:scale-100 dark:bg-midnight`}
      onClick={switchTheme}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
