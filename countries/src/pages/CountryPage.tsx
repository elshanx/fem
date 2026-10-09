import { useLocation, useNavigate, useParams } from 'react-router';

import BorderLinks from '../components/BorderLinks.tsx';
import { ArrowLeftIcon } from '../components/icons.tsx';
import InfoItem from '../components/InfoItem.tsx';
import { getCountry } from '../lib/countries.ts';
import { formatList, formatNumber } from '../lib/format.ts';
import NotFoundPage from './NotFoundPage.tsx';

export default function CountryPage() {
  const { code = '' } = useParams();
  const { key } = useLocation();
  const navigate = useNavigate();
  const country = getCountry(code.toUpperCase());

  const goBack = () => {
    if (key === 'default') navigate('/');
    else navigate(-1);
  };

  if (!country) return <NotFoundPage />;

  return (
    <article>
      <title>{`${country.name} | Where in the world?`}</title>
      <button
        type='button'
        onClick={goBack}
        className='mb-16 flex items-center gap-2 surface px-6 py-2 text-sm font-light sm:mb-20 sm:px-8 sm:text-base'
      >
        <ArrowLeftIcon />
        Back
      </button>
      <div className='grid items-center gap-11 lg:grid-cols-2 lg:gap-36'>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name}`}
          className='w-full shadow-md shadow-black/5'
        />
        <div>
          <h1 className='mb-6 text-2xl font-extrabold sm:text-3xl'>{country.name}</h1>
          <div className='mb-8 grid gap-8 text-sm sm:grid-cols-2 sm:text-base lg:mb-16'>
            <dl className='space-y-2'>
              <InfoItem label='Native Name' value={country.nativeName} />
              <InfoItem label='Population' value={formatNumber(country.population)} />
              <InfoItem label='Region' value={country.region} />
              <InfoItem label='Sub Region' value={country.subregion} />
              <InfoItem label='Capital' value={country.capital ?? 'N/A'} />
            </dl>
            <dl className='space-y-2'>
              <InfoItem label='Top Level Domain' value={formatList(country.topLevelDomain)} />
              <InfoItem
                label='Currencies'
                value={formatList(country.currencies?.map(({ name }) => name))}
              />
              <InfoItem
                label='Languages'
                value={formatList(country.languages.map(({ name }) => name))}
              />
            </dl>
          </div>
          <BorderLinks codes={country.borders ?? []} />
        </div>
      </div>
    </article>
  );
}
