import { ViewTransition, type ReactNode } from 'react';

const directional = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' };

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default='none'>
      {children}
    </ViewTransition>
  );
}
