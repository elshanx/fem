import JobList from '@/components/JobList/JobList';

export default function Home() {
  return (
    <section className='min-h-screen bg-light-grey'>
      {/* <Header />
      <SearchFilter /> */}
      <main className='mx-auto px-6 pt-[57px]'>
        <JobList />
      </main>
    </section>
  );
}
