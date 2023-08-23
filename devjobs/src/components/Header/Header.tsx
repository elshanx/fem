import { Logo, Moon, Sun } from '@/common/icons';
import { ThemeSwitcher } from '@/utils/ThemeSwitcher';
import Link from 'next/link';
import SearchFilter from '../SearchFilter/SearchFilter';

const Header = () => {
  return (
    <header className='mb-12 bg-violet pb-[72px] pt-8'>
      <div className='relative mx-auto px-6 xl:max-w-[1110px] xl:px-0'>
        <div className='flex items-center justify-between'>
          <div>
            <Link href='/'>
              <Logo />
            </Link>
          </div>
          <div className='flex items-center justify-center gap-x-4'>
            <Sun />
            <ThemeSwitcher />
            <Moon />
          </div>
        </div>
        <SearchFilter />
      </div>
    </header>
  );
};

export default Header;
