import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Shortener from '@/components/Shortener';
import Statistics from '@/components/Statistics';
import BoostCta from '@/components/BoostCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className='overflow-x-clip'>
        <Hero />
        <div className='bg-gray-100 pb-20 lg:pb-30'>
          <Shortener />
          <Statistics />
        </div>
        <BoostCta />
      </main>
      <Footer />
    </>
  );
}
