import Image from 'next/image';

export default function Hero() {
  return (
    <section className='wrapper flex flex-col gap-9 pt-6 pb-40 text-center lg:flex-row-reverse lg:items-center lg:justify-end lg:gap-0 lg:pt-20 lg:pb-62 lg:text-left'>
      <Image
        src='/images/illustration-working.svg'
        alt=''
        width={733}
        height={482}
        priority
        className='ml-6 h-auto w-[133%] max-w-none sm:ml-0 sm:w-full lg:-mr-64 lg:w-184 lg:shrink-0'
      />
      <div className='lg:w-140 lg:shrink-0'>
        <h1 className='text-[2.625rem] leading-tight font-bold tracking-tight text-gray-950 lg:text-[5rem] lg:leading-[1.15] lg:tracking-[-0.035em]'>
          More than just shorter links
        </h1>
        <p className='mt-3 text-lg leading-relaxed lg:mt-1 lg:text-[1.375rem]'>
          Build your brand’s recognition and get detailed insights on how your links are performing.
        </p>
        <a href='#' className='mt-8 btn px-10 py-4 text-xl'>
          Get Started
        </a>
      </div>
    </section>
  );
}
