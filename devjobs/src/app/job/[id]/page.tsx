import type { Params } from '@/common/types';
import data from '@/db/mock.json';

type Props = Params<{ id: string }>;

export default function JobDetails({ params: { id } }: Props) {
  const job = data.find((j) => j.id === +id);
  // if (!job) throw new Error('ajshdjhsd');

  return <main>{JSON.stringify(job)}</main>;
}
