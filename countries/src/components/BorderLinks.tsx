import { Link } from 'react-router';

import { getCountry } from '../lib/countries.ts';

interface BorderLinksProps {
  codes: string[];
}

export default function BorderLinks({ codes }: BorderLinksProps) {
  return (
    <div className='flex flex-col gap-4 lg:flex-row lg:items-baseline'>
      <h2 className='shrink-0 font-semibold'>Border Countries:</h2>
      {codes.length ? (
        <ul className='flex flex-wrap gap-2.5'>
          {codes.map((code) => (
            <li key={code}>
              <Link
                to={`/country/${code}`}
                className='inline-block surface px-6 py-1 text-sm font-light'
              >
                {getCountry(code)?.name ?? code}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className='font-light'>None</p>
      )}
    </div>
  );
}
