import data from '../data/countries.json';

export interface Country {
  name: string;
  nativeName: string;
  capital?: string;
  region: string;
  subregion: string;
  population: number;
  topLevelDomain: string[];
  currencies?: { name: string }[];
  languages: { name: string }[];
  borders?: string[];
  alpha3Code: string;
  flags: { svg: string; png: string };
}

export const countries: Country[] = data;

const countriesByCode = new Map(countries.map((country) => [country.alpha3Code, country]));

export const getCountry = (code: string): Country | undefined => countriesByCode.get(code);

export const regions = [...new Set(countries.map(({ region }) => region))].sort();
