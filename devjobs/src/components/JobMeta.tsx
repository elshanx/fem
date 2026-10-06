import { OvalIcon } from '@/common/icons';

export default function JobMeta({ postedAt, contract }: { postedAt: string; contract: string }) {
  return (
    <p className='flex items-center gap-3 text-body text-dark-grey'>
      <span>{postedAt}</span>
      <OvalIcon />
      <span>{contract}</span>
    </p>
  );
}
