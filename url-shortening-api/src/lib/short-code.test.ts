import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CODE_PATTERN, generateCode, normalizeUrl } from './short-code.ts';

test('normalizeUrl', () => {
  assert.equal(normalizeUrl('https://example.com/a?b=1'), 'https://example.com/a?b=1');
  assert.equal(normalizeUrl('  example.com '), 'https://example.com/');
  assert.equal(normalizeUrl('http://sub.example.org'), 'http://sub.example.org/');
  for (const bad of ['', '   ', 'nope', 'javascript:alert(1)', 'ftp://example.com', 42, null]) {
    assert.equal(normalizeUrl(bad), null, String(bad));
  }
});

test('generateCode', () => {
  const codes = new Set(Array.from({ length: 1000 }, generateCode));
  assert.equal(codes.size, 1000);
  for (const code of codes) assert.match(code, CODE_PATTERN);
});
