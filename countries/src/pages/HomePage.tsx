import { useSearchParams } from 'react-router';

import CountryCard from '../components/CountryCard.tsx';
import RegionFilter from '../components/RegionFilter.tsx';
import SearchInput from '../components/SearchInput.tsx';
import { countries, regions } from '../lib/countries.ts';
import filterCountries from '../lib/filter-countries.ts';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const region = searchParams.get('region') ?? '';
  const visibleCountries = filterCountries(countries, query, region);

  const updateParam = (key: string, value: string) => {
    setSearchParams(
      (params) => {
        if (value) params.set(key, value);
        else params.delete(key);
        return params;
      },
      { replace: true }
    );
  };

  return (
    <>
      <h1 className='sr-only'>Countries of the world</h1>
      <div className='mb-8 flex flex-col gap-10 sm:mb-12 sm:flex-row sm:items-center sm:justify-between'>
        <SearchInput value={query} onChange={(value) => updateParam('q', value)} />
        <RegionFilter
          regions={regions}
          value={region}
          onChange={(value) => updateParam('region', value)}
        />
      </div>
      <p role='status' className='sr-only'>
        {visibleCountries.length} countries found
      </p>
      {visibleCountries.length ? (
        <ul className='grid grid-cols-[repeat(auto-fill,minmax(16.5rem,1fr))] gap-10 px-6 sm:px-0 lg:gap-18'>
          {visibleCountries.map((country) => (
            <CountryCard key={country.alpha3Code} country={country} />
          ))}
        </ul>
      ) : (
        <p className='py-20 text-center font-semibold'>No countries match your search.</p>
      )}
    </>
  );
}
