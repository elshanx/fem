import JobList from '@/components/JobList/JobList';

export default function Home() {
  return (
    <section className='min-h-[100dvh] bg-light-grey'>
      {/* <Header />
      <SearchFilter /> */}
      <main className='mx-auto px-6 pb-[62px] pt-[57px]'>
        <JobList />
      </main>
    </section>
  );
}
