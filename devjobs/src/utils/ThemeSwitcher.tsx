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
    <button className='btn' onClick={switchTheme}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};
