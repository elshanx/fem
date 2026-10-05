import Image from 'next/image';

const columns = {
  features: ['Link Shortening', 'Branded Links', 'Analytics'],
  resources: ['Blog', 'Developers', 'Support'],
  company: ['About', 'Our Team', 'Careers', 'Contact'],
};

const socials = ['facebook', 'twitter', 'pinterest', 'instagram'];

export default function Footer() {
  return (
    <footer className='bg-gray-950 py-14 text-center text-[0.9375rem] capitalize lg:py-18 lg:text-left'>
      <div className='wrapper flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-0'>
        <a href='#' aria-label='Shortly home' className='lg:mr-auto'>
          <Image
            src='/images/logo.svg'
            alt='Shortly'
            width={121}
            height={33}
            className='brightness-0 invert'
          />
        </a>

        <nav className='flex flex-col gap-10 lg:flex-row lg:gap-20' aria-label='Footer'>
          {Object.entries(columns).map(([heading, items]) => (
            <div key={heading}>
              <h2 className='font-bold text-white'>{heading}</h2>
              <ul className='mt-5 flex flex-col gap-2.5'>
                {items.map((item) => (
                  <li key={item}>
                    <a href='#' className='text-gray-400 transition-colors hover:text-cyan'>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <ul className='flex items-center gap-6 lg:ml-24'>
          {socials.map((name) => (
            <li key={name}>
              <a href='#' aria-label={name} className='group block'>
                <span
                  aria-hidden='true'
                  className='block size-6 bg-white transition-colors group-hover:bg-cyan'
                  style={{ mask: `url(/images/icon-${name}.svg) center / contain no-repeat` }}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className='mt-12 text-center text-xs text-gray-400'>
        Challenge by{' '}
        <a
          href='https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G'
          className='text-cyan hover:underline'
        >
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a href='https://github.com/elshanx' className='text-cyan hover:underline'>
          elshanx
        </a>
        .
      </p>
    </footer>
  );
}
