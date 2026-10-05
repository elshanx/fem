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
