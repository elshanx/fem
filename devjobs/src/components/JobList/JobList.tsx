import data from '@/db/mock.json';
import Job from '../Job/Job';

const JobList = () => {
  return (
    <>
      {data.map((job) => (
        <Job key={job.id} {...job} />
      ))}
      <button className='mx-auto block h-12 w-36 rounded bg-violet font-bold text-white'>
        Load more
      </button>
    </>
  );
};

export default JobList;
