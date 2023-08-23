import data from '@/db/mock.json';
import Job from '../Job/Job';

const JobList = () => {
  return (
    <>
      <div className='mb-8 grid gap-y-[49px] md:mb-[56px] md:grid-cols-2 md:gap-x-[11px] md:gap-y-[65px] xl:grid-cols-3 xl:gap-x-[30px]'>
        {data.map((job) => (
          <Job key={job.id} {...job} />
        ))}
      </div>
      <button className='mx-auto block h-12 w-36 rounded bg-violet font-bold text-white transition-colors hover:bg-light-violet'>
        Load more
      </button>
    </>
  );
};

export default JobList;
