import Image from 'next/image';

const FEATURES = [
  {
    icon: 'icon-brand-recognition.svg',
    title: 'Brand Recognition',
    text: 'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.',
  },
  {
    icon: 'icon-detailed-records.svg',
    title: 'Detailed Records',
    text: 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
  },
  {
    icon: 'icon-fully-customizable.svg',
    title: 'Fully Customizable',
    text: 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
  },
];

export default function Statistics() {
  return (
    <section className='wrapper pt-20 text-center lg:pt-30'>
      <h2 className='text-[1.75rem] font-bold text-gray-950 lg:text-[2.5rem]'>
        Advanced Statistics
      </h2>
      <p className='mx-auto mt-4 max-w-132 text-base leading-7 lg:text-lg'>
        Track how your links are performing across the web with our advanced statistics dashboard.
      </p>

      <ul className='relative mt-24 flex flex-col gap-24 lg:flex-row lg:gap-8 lg:text-left'>
        <span
          aria-hidden='true'
          className='absolute inset-y-0 left-1/2 w-2 -translate-x-1/2 bg-cyan lg:inset-x-0 lg:inset-y-auto lg:top-1/2 lg:left-0 lg:h-2 lg:w-full lg:translate-x-0'
        />
        {FEATURES.map(({ icon, title, text }, i) => (
          <li
            key={title}
            className={`relative rounded-md bg-white px-8 pt-19 pb-10 lg:flex-1 ${['', 'lg:mt-11', 'lg:mt-22'][i]} lg:mb-auto`}
          >
            <span className='absolute -top-11 left-1/2 grid size-22 -translate-x-1/2 place-items-center rounded-full bg-violet lg:left-8 lg:translate-x-0'>
              <Image src={`/images/${icon}`} alt='' width={40} height={40} />
            </span>
            <h3 className='text-[1.375rem] font-bold text-gray-950'>{title}</h3>
            <p className='mt-3 text-[0.9375rem] leading-relaxed'>{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
