import { readFile, writeFile } from 'node:fs/promises';

interface Named {
  name: string;
}

interface RawCountry {
  name: string;
  nativeName: string;
  capital?: string;
  region: string;
  subregion: string;
  population: number;
  topLevelDomain: string[];
  currencies?: Named[];
  languages: Named[];
  borders?: string[];
  alpha3Code: string;
  flags: { svg: string; png: string };
}

const pickNames = (items: Named[]) => items.map(({ name }) => ({ name }));

const raw: RawCountry[] = JSON.parse(await readFile('data.json', 'utf8'));

const countries = raw.map((country) => ({
  name: country.name,
  nativeName: country.nativeName,
  capital: country.capital,
  region: country.region,
  subregion: country.subregion,
  population: country.population,
  topLevelDomain: country.topLevelDomain,
  currencies: country.currencies && pickNames(country.currencies),
  languages: pickNames(country.languages),
  borders: country.borders,
  alpha3Code: country.alpha3Code,
  flags: country.flags,
}));

await writeFile('src/data/countries.json', JSON.stringify(countries));
