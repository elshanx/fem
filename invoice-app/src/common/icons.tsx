import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  'aria-hidden': true,
  focusable: false,
  xmlns: 'http://www.w3.org/2000/svg',
} as const;

export function Logo(props: IconProps) {
  return (
    <svg {...base} width='28' height='26' viewBox='0 0 28 26' {...props}>
      <path
        fill='#FFF'
        fillRule='evenodd'
        d='M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z'
      />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} width='11' height='7' viewBox='0 0 11 7' fill='none' {...props}>
      <path d='M1 1l4.228 4.228L9.456 1' stroke='#7C5DFA' strokeWidth='2' />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} width='7' height='10' viewBox='0 0 7 10' fill='none' {...props}>
      <path d='M6.342.886L2.114 5.114l4.228 4.228' stroke='#7C5DFA' strokeWidth='2' />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} width='7' height='10' viewBox='0 0 7 10' fill='none' {...props}>
      <path d='M1 1l4 4-4 4' stroke='#7C5DFA' strokeWidth='2' />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} width='11' height='11' viewBox='0 0 11 11' {...props}>
      <path
        d='M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z'
        fill='currentColor'
      />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} width='10' height='8' viewBox='0 0 10 8' fill='none' {...props}>
      <path d='M1.5 4.5l2.124 2.124L8.97 1.28' stroke='#FFF' strokeWidth='2' />
    </svg>
  );
}

export function Trash(props: IconProps) {
  return (
    <svg {...base} width='13' height='16' viewBox='0 0 13 16' {...props}>
      <path
        fillRule='evenodd'
        d='M8.472 0l.89.889h3.11v1.778H.028V.889h3.11L4.029 0h4.444zM2.695 16a1.777 1.777 0 01-1.778-1.778V3.556h10.666v10.666c0 .982-.795 1.778-1.777 1.778H2.695z'
        fill='currentColor'
      />
    </svg>
  );
}

export function Moon(props: IconProps) {
  return (
    <svg {...base} width='20' height='20' viewBox='0 0 20 20' {...props}>
      <path
        d='M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.581.46 7.516 7.516 0 01-5.318-2.2 7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0 003.579-5.597.62.62 0 00-.46-.793z'
        fill='currentColor'
      />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg {...base} width='20' height='20' viewBox='0 0 20 20' {...props}>
      <path
        d='M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.482 2.17-1.482 3.545 0 1.376.582 2.646 1.482 3.545.9.9 2.169 1.482 3.545 1.482a4.934 4.934 0 003.545-1.482c.899-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344L17.09 3.89a.67.67 0 000-.952.67.67 0 00-.953 0l-1.455 1.455a.67.67 0 000 .952c.238.265.662.265.953 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .953l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.953l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .953.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.953c-.238-.264-.661-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z'
        fill='currentColor'
      />
    </svg>
  );
}
