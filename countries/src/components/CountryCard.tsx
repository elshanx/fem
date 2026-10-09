import { Link } from 'react-router';

import type { Country } from '../lib/countries.ts';
import { formatNumber } from '../lib/format.ts';
import InfoItem from './InfoItem.tsx';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <li className='overflow-hidden surface transition hover:-translate-y-1 hover:shadow-lg'>
      <Link to={`/country/${country.alpha3Code}`} className='block h-full'>
        <img
          src={country.flags.svg}
          alt=''
          loading='lazy'
          className='aspect-5/3 w-full object-cover'
        />
        <div className='px-6 pt-6 pb-11'>
          <h2 className='mb-4 text-lg font-extrabold'>{country.name}</h2>
          <dl className='space-y-2 text-sm'>
            <InfoItem label='Population' value={formatNumber(country.population)} />
            <InfoItem label='Region' value={country.region} />
            <InfoItem label='Capital' value={country.capital ?? 'N/A'} />
          </dl>
        </div>
      </Link>
    </li>
  );
}
