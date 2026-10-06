import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/common/icons';
import ThemeToggle from '@/components/layout/ThemeToggle';

export default function Sidebar() {
  return (
    <header className='fixed inset-x-0 top-0 z-30 flex h-topbar items-center bg-slate md:h-topbar-md lg:inset-y-0 lg:right-auto lg:h-auto lg:w-sidebar lg:flex-col lg:rounded-r-[1.25rem] dark:bg-navy-900'>
      <Link
        href='/'
        aria-label='Invoices'
        className='group relative grid size-topbar shrink-0 place-items-center overflow-hidden rounded-r-[1.25rem] bg-violet focus-ring md:size-topbar-md lg:size-sidebar'
      >
        <span className='absolute inset-x-0 bottom-0 h-1/2 rounded-tl-[1.25rem] bg-violet-light transition-[height] group-hover:h-3/5' />
        <Logo className='relative h-6.5 w-7 md:h-7.5 md:w-8 lg:h-9.5 lg:w-10' />
      </Link>

      <div className='ml-auto flex h-full items-center gap-4 pr-4 md:gap-6 md:pr-6 lg:mt-auto lg:ml-0 lg:h-auto lg:w-full lg:flex-col lg:p-0'>
        <ThemeToggle />
        <div className='flex h-full items-center border-l border-[#494e6e] pl-4 md:pl-6 lg:h-auto lg:w-full lg:justify-center lg:border-t lg:border-l-0 lg:py-6 lg:pl-0'>
          <Image
            src='/avatar.jpg'
            alt='Profile'
            width={40}
            height={40}
            className='size-8 rounded-full lg:size-10'
          />
        </div>
      </div>
    </header>
  );
}
