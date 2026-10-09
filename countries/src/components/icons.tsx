interface IconProps {
  className?: string;
}

export function MoonIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className={className}
      aria-hidden='true'
    >
      <path
        d='M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function SunIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className={className}
      aria-hidden='true'
    >
      <circle cx='12' cy='12' r='4' />
      <path
        d='M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'
        strokeLinecap='round'
      />
    </svg>
  );
}

export function SearchIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      className={className}
      aria-hidden='true'
    >
      <circle cx='11' cy='11' r='7' />
      <path d='m20 20-4-4' strokeLinecap='round' />
    </svg>
  );
}

export function ArrowLeftIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className={className}
      aria-hidden='true'
    >
      <path d='M19 12H5M11 18l-6-6 6-6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

export function ChevronDownIcon({ className = 'size-3' }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      className={className}
      aria-hidden='true'
    >
      <path d='m6 9 6 6 6-6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

export function ArrowUpIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      className={className}
      aria-hidden='true'
    >
      <path d='M12 19V5M6 11l6-6 6 6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
