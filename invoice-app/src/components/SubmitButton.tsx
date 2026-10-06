'use client';

import type { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button type='submit' disabled={pending} className={className}>
      {children}
    </button>
  );
}
