import { lookup } from 'node:dns/promises';
import { BlockList, isIP } from 'node:net';

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const LENGTH = 7;

export const CODE_PATTERN = new RegExp(`^[0-9A-Za-z]{${LENGTH}}$`);

export function generateCode() {
  // ponytail: modulo bias (256 % 62) is negligible for non-secret short codes
  return Array.from(crypto.getRandomValues(new Uint8Array(LENGTH)), (b) => ALPHABET[b % 62]).join(
    ''
  );
}

export const MAX_URL_LENGTH = 2048;

const PRIVATE_IPV4 = [
  /^0\./,
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
];

// URL already normalizes hex/decimal IPv4 forms (e.g. 0x7f.1 → 127.0.0.1) before this runs.
function isPrivateHost(hostname: string) {
  if (hostname.startsWith('[')) return true;
  if (/\.(local|internal|localhost)$/.test(hostname)) return true;
  return /^\d+\.\d+\.\d+\.\d+$/.test(hostname) && PRIVATE_IPV4.some((re) => re.test(hostname));
}

export function normalizeUrl(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const raw = input.trim();
  if (!raw || raw.length > MAX_URL_LENGTH) return null;
  // Accept "example.com" by assuming https.
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    // "localhost." and "example.com." are the same hosts as without the dot.
    url.hostname = url.hostname.replace(/\.+$/, '');
    const ok =
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      url.hostname.includes('.') &&
      !url.username &&
      !url.password &&
      !isPrivateHost(url.hostname);
    return ok ? url.href : null;
  } catch {
    return null;
  }
}

/** True when a normalized URL points back at one of the shortener's own hosts. */
export const isOwnLink = (normalizedUrl: string, ownHosts: (string | null)[]) =>
  ownHosts.includes(new URL(normalizedUrl).host);

const PRIVATE_ADDRESSES = new BlockList();
[
  '0.0.0.0/8',
  '10.0.0.0/8',
  '100.64.0.0/10',
  '127.0.0.0/8',
  '169.254.0.0/16',
  '172.16.0.0/12',
  '192.168.0.0/16',
  '::/128',
  '::1/128',
  'fc00::/7',
  'fe80::/10',
].forEach((cidr) => {
  const [network, prefix] = cidr.split('/');
  PRIVATE_ADDRESSES.addSubnet(network, Number(prefix), isIP(network) === 6 ? 'ipv6' : 'ipv4');
});

export function isPrivateAddress(address: string) {
  // IPv4-mapped IPv6 (::ffff:127.0.0.1) is checked as the IPv4 address it wraps.
  const ip = address.replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/i, '');
  return PRIVATE_ADDRESSES.check(ip, isIP(ip) === 6 ? 'ipv6' : 'ipv4');
}

/**
 * Policy filter, not a security boundary: catches public names that point at loopback or a
 * private network (localtest.me, 127.0.0.1.nip.io). DNS can change after this check, and the
 * server never fetches the target, so this only keeps obviously local links out.
 */
export async function resolvesToPrivate(hostname: string) {
  // ponytail: names that fail to resolve pass through; reject them too if dead links matter
  const addresses = await lookup(hostname, { all: true }).catch(() => []);
  return addresses.some(({ address }) => isPrivateAddress(address));
}
