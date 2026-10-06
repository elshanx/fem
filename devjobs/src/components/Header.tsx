import Link from 'next/link';
import { HeaderBgDesktop, HeaderBgMobile, HeaderBgTablet, Logo } from '@/common/icons';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className='relative h-34 overflow-hidden bg-violet md:h-40 md:rounded-bl-[6.25rem]'>
      <HeaderBgMobile className='absolute top-0 left-0 md:hidden' />
      <HeaderBgTablet className='absolute top-0 left-0 hidden md:block xl:hidden' />
      <HeaderBgDesktop className='absolute top-0 left-0 hidden xl:block' />

      <div className='relative container-page flex items-center justify-between pt-8 md:pt-10.5 xl:pt-11'>
        <Link
          href='/'
          transitionTypes={['nav-back']}
          aria-label='devjobs home'
          className='rounded-sm focus-ring'
        >
          <Logo />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
