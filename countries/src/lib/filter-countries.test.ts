import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { Country } from './countries.ts';
import filterCountries from './filter-countries.ts';

const makeCountry = (name: string, region: string): Country => ({
  name,
  region,
  nativeName: name,
  subregion: region,
  population: 0,
  topLevelDomain: [],
  languages: [],
  alpha3Code: name.slice(0, 3).toUpperCase(),
  flags: { svg: '', png: '' },
});

const list = [
  makeCountry('Germany', 'Europe'),
  makeCountry('Niger', 'Africa'),
  makeCountry('Japan', 'Asia'),
];

const names = (result: Country[]) => result.map(({ name }) => name);

test('returns everything for an empty query and region', () => {
  assert.deepEqual(names(filterCountries(list, '', '')), ['Germany', 'Niger', 'Japan']);
});

test('matches name case-insensitively and ignores surrounding whitespace', () => {
  assert.deepEqual(names(filterCountries(list, '  GER ', '')), ['Germany', 'Niger']);
});

test('ranks name prefix, then word prefix, then substring matches', () => {
  const ranked = [
    makeCountry('Algeria', 'Africa'),
    makeCountry('Niger', 'Africa'),
    makeCountry('East Germania', 'Europe'),
    makeCountry('Germany', 'Europe'),
  ];
  assert.deepEqual(names(filterCountries(ranked, 'ger', '')), [
    'Germany',
    'East Germania',
    'Algeria',
    'Niger',
  ]);
});

test('combines query with region', () => {
  assert.deepEqual(names(filterCountries(list, 'ger', 'Africa')), ['Niger']);
});
