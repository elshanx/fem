import type { Country } from './countries.ts';

const NO_MATCH = -1;

const matchRank = (name: string, query: string): number => {
  const lowerName = name.toLowerCase();
  if (lowerName.startsWith(query)) return 0;
  if (lowerName.split(/[\s(-]+/).some((word) => word.startsWith(query))) return 1;
  if (lowerName.includes(query)) return 2;
  return NO_MATCH;
};

export default function filterCountries(list: Country[], query: string, region: string): Country[] {
  const normalizedQuery = query.trim().toLowerCase();

  return list
    .filter((country) => !region || country.region === region)
    .map((country) => ({ country, rank: matchRank(country.name, normalizedQuery) }))
    .filter(({ rank }) => rank !== NO_MATCH)
    .sort((a, b) => a.rank - b.rank)
    .map(({ country }) => country);
}
