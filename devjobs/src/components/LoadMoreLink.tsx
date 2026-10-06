'use client';

import Link, { useLinkStatus } from 'next/link';

function Label() {
  const { pending } = useLinkStatus();
  return <span aria-live='polite'>{pending ? 'Loading…' : 'Load More'}</span>;
}

export default function LoadMoreLink({ href }: { href: string }) {
  return (
    <Link href={href} scroll={false} className='mx-auto mt-8 btn-primary flex w-fit md:mt-14'>
      <Label />
    </Link>
  );
}
