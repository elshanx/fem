import Header from '@/components/Header/Header';
import JobList from '@/components/JobList/JobList';

export default function Home() {
  return (
    <section className='min-h-[100dvh] bg-light-grey dark:bg-midnight'>
      <Header />
      <main className='mx-auto px-6 pb-[62px] pt-[57px] md:px-10 xl:max-w-[1110px] xl:px-0'>
        <JobList />
      </main>
    </section>
  );
}
