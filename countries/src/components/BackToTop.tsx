import { useEffect, useState } from 'react';

import { ArrowUpIcon } from './icons.tsx';

const SHOW_AFTER_PX = 400;

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > SHOW_AFTER_PX);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      type='button'
      onClick={scrollToTop}
      aria-label='Back to top'
      className='fixed right-4 bottom-4 grid size-12 place-items-center surface rounded-full shadow-lg sm:right-10 sm:bottom-10'
    >
      <ArrowUpIcon className='size-5' />
    </button>
  );
}
