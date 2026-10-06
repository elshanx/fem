import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  CODE_PATTERN,
  MAX_URL_LENGTH,
  generateCode,
  isOwnLink,
  isPrivateAddress,
  normalizeUrl,
} from './short-code.ts';

test('normalizeUrl', () => {
  assert.equal(normalizeUrl('https://example.com/a?b=1'), 'https://example.com/a?b=1');
  assert.equal(normalizeUrl('  example.com '), 'https://example.com/');
  assert.equal(normalizeUrl('http://sub.example.org'), 'http://sub.example.org/');
  // eslint-disable-next-line no-script-url -- asserting that script URLs are rejected
  const scriptUrl = 'javascript:alert(1)';
  ['', '   ', 'nope', scriptUrl, 'ftp://example.com', 42, null].forEach((bad) => {
    assert.equal(normalizeUrl(bad), null, String(bad));
  });
});

test('normalizeUrl rejects abuse-prone targets', () => {
  const longUrl = `https://example.com/${'a'.repeat(MAX_URL_LENGTH)}`;
  [
    longUrl,
    'http://localhost:3000',
    'http://localhost.:3000/admin',
    'http://printer.local.',
    'http://printer.local',
    'http://db.internal/admin',
    'http://127.0.0.1',
    'http://2130706433',
    'http://0x7f.1',
    'http://10.0.0.5',
    'http://172.20.1.1',
    'http://192.168.1.1',
    'http://169.254.169.254/latest/meta-data',
    'http://[::1]',
    'https://user:pw@example.com',
  ].forEach((bad) => {
    assert.equal(normalizeUrl(bad), null, bad);
  });
  assert.equal(normalizeUrl('http://172.32.0.1'), 'http://172.32.0.1/');
  assert.equal(normalizeUrl('https://8.8.8.8'), 'https://8.8.8.8/');
  assert.equal(normalizeUrl('https://example.com./a'), 'https://example.com/a');
});

test('isOwnLink', () => {
  const ownHosts = ['short.example', null];
  assert.equal(isOwnLink(normalizeUrl('https://short.example./abc')!, ownHosts), true);
  assert.equal(isOwnLink(normalizeUrl('https://short.example/abc')!, ownHosts), true);
  assert.equal(isOwnLink(normalizeUrl('https://example.com')!, ownHosts), false);
});

test('isPrivateAddress', () => {
  [
    '127.0.0.1',
    '10.1.2.3',
    '192.168.0.10',
    '::1',
    'fd00::1',
    'fe80::1',
    '::ffff:127.0.0.1',
  ].forEach((ip) => assert.equal(isPrivateAddress(ip), true, ip));
  ['8.8.8.8', '172.32.0.1', '2606:4700::1111'].forEach((ip) =>
    assert.equal(isPrivateAddress(ip), false, ip)
  );
});

test('generateCode', () => {
  const codes = new Set(Array.from({ length: 1000 }, generateCode));
  assert.equal(codes.size, 1000);
  codes.forEach((code) => assert.match(code, CODE_PATTERN));
});
