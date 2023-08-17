import { darkTheme, lightTheme } from '../theme';
import { useEffect, useState } from 'react';

import useMedia from './useMedia';

const useDarkTheme = () => {
  const [theme, setTheme] = useState('light');
  const themes = theme == 'light' ? lightTheme : darkTheme;

  const prefersDarkMode = useMedia(
    ['(prefers-color-scheme: dark)'],
    [true],
    false,
  );

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      window.localStorage.setItem('theme', localTheme);
      setTheme(localTheme);
    } else if (prefersDarkMode) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [prefersDarkMode]);

  return [themes, theme, toggleTheme];
};

export default useDarkTheme;
