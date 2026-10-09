import { Link } from 'react-router';

import ThemeToggle from './ThemeToggle.tsx';

export default function Header() {
  return (
    <header className='bg-white shadow-md shadow-black/5 dark:bg-blue-900'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-7 sm:px-10 sm:py-6'>
        <Link to='/' className='text-sm font-extrabold sm:text-2xl'>
          Where in the world?
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
