import { Outlet } from 'react-router';

import BackToTop from './BackToTop.tsx';
import Header from './Header.tsx';

export default function Layout() {
  return (
    <>
      <Header />
      <main className='mx-auto max-w-7xl px-4 py-6 sm:px-10 sm:py-12'>
        <Outlet />
      </main>
      <BackToTop />
    </>
  );
}
