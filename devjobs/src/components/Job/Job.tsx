import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { OvalIcon } from '../../common/icons';
import type { Job as JobT } from './types';

export default function Job(props: JobT) {
  const {
    id,
    postedAt,
    contract,
    position,
    company,
    location,
    logoBackground,
    logo,
  } = props;

  return (
    <Link href={`job/${id}`} className='mb-[49px] block last-of-type:mb-8'>
      <div className='relative min-h-[228px] rounded-md bg-white pb-8 pl-8 pr-1 pt-[49px]'>
        <header className='mb-4 flex items-center gap-x-4 text-dark-grey'>
          <div
            style={{ backgroundColor: logoBackground }}
            className={twMerge(
              'absolute left-8 top-[-25px] flex h-[50px] w-[50px] items-center justify-center rounded-[15px]'
            )}
          >
            <img src={logo} alt={company} />
          </div>
          <span>{postedAt}</span>
          <div>
            <OvalIcon />
          </div>
          <span>{contract}</span>
        </header>
        <p className='mb-4 text-[20px] font-bold leading-6 text-very-dark-blue'>
          {position}
        </p>
        <span className='mb-11 block text-dark-grey'>{company}</span>
        <span className='block text-[14px] font-bold leading-[17.36px] text-violet'>
          {location}
        </span>
      </div>
    </Link>
  );
}
