import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildWhere, parseFilters, toQueryString } from './filters.ts';

test('parseFilters', () => {
  assert.deepEqual(parseFilters({}), { title: '', location: '', fullTime: false, page: 1 });
  assert.deepEqual(
    parseFilters({ title: '  engineer ', location: ['UK', 'US'], fullTime: 'on', page: '3' }),
    { title: 'engineer', location: 'UK', fullTime: true, page: 3 }
  );
  ['0', '-2', 'abc', ''].forEach((page) => assert.equal(parseFilters({ page }).page, 1, page));
  assert.equal(parseFilters({ page: '99999' }).page, 100);
  assert.equal(parseFilters({ title: 'x'.repeat(500) }).title.length, 100);
  assert.equal(parseFilters({ fullTime: 'true' }).fullTime, false);
});

test('buildWhere', () => {
  assert.deepEqual(buildWhere(parseFilters({})), {});
  assert.deepEqual(buildWhere(parseFilters({ title: 'dev', location: 'uk', fullTime: 'on' })), {
    OR: [
      { position: { contains: 'dev', mode: 'insensitive' } },
      { company: { contains: 'dev', mode: 'insensitive' } },
    ],
    location: { contains: 'uk', mode: 'insensitive' },
    contract: 'Full Time',
  });
});

test('toQueryString', () => {
  assert.equal(toQueryString(parseFilters({})), '');
  assert.equal(
    toQueryString({ title: 'a b', location: '', fullTime: true, page: 2 }),
    '?title=a+b&fullTime=on&page=2'
  );
});
