import { ViewTransition, type ReactNode } from 'react';

const directional = { 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' };

/**
 * Slides page content left on forward navigation and right on back navigation.
 * Use inside each page (not a layout): layouts persist, so they never enter or exit.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={directional} exit={directional} default='none'>
      {children}
    </ViewTransition>
  );
}
