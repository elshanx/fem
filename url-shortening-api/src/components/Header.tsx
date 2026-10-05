'use client';

import Image from 'next/image';
import { useState } from 'react';

const NAV = ['Features', 'Pricing', 'Resources'];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className='relative wrapper flex items-center gap-11 pt-10 lg:pt-12'>
      <a href='#' aria-label='Shortly home'>
        <Image src='/images/logo.svg' alt='Shortly' width={121} height={33} priority />
      </a>

      <button
        type='button'
        className='ml-auto cursor-pointer lg:hidden'
        aria-expanded={open}
        aria-controls='primary-nav'
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        <svg
          width='24'
          height='21'
          viewBox='0 0 24 21'
          aria-hidden='true'
          className='fill-gray-500'
        >
          <rect width='24' height='3' />
          <rect y='9' width='24' height='3' />
          <rect y='18' width='24' height='3' />
        </svg>
      </button>

      <nav
        id='primary-nav'
        className={`${open ? 'flex' : 'hidden'} absolute inset-x-6 top-full z-10 mt-6 flex-col items-center gap-6 rounded-xl bg-violet px-6 py-10 text-lg font-bold text-white lg:static lg:mt-0 lg:flex lg:flex-1 lg:flex-row lg:gap-8 lg:bg-transparent lg:p-0 lg:text-[0.9375rem] lg:text-gray-500`}
      >
        <ul className='flex flex-col items-center gap-7 lg:flex-row lg:gap-8'>
          {NAV.map((item) => (
            <li key={item}>
              <a href='#' className='transition-colors hover:text-cyan lg:hover:text-gray-950'>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <hr className='w-full border-gray-500/25 lg:hidden' />
        <div className='flex w-full flex-col items-center gap-6 lg:ml-auto lg:w-auto lg:flex-row lg:gap-9'>
          <a href='#' className='transition-colors hover:text-cyan lg:hover:text-gray-950'>
            Login
          </a>
          <a href='#' className='btn w-full py-3 text-center lg:w-auto lg:px-6 lg:py-2.5'>
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
}
