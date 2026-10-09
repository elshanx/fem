export type Theme = 'light' | 'dark';

export const getInitialTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

export const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};
