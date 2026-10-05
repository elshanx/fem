const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const LENGTH = 7; // 62^7 ≈ 3.5 trillion codes

export const CODE_PATTERN = new RegExp(`^[0-9A-Za-z]{${LENGTH}}$`);

export function generateCode() {
  // ponytail: modulo bias (256 % 62) is negligible for non-secret short codes
  return Array.from(crypto.getRandomValues(new Uint8Array(LENGTH)), (b) => ALPHABET[b % 62]).join(
    ''
  );
}

/** Normalizes user input to an absolute http(s) URL, or returns null if it isn't one. */
export function normalizeUrl(input: unknown): string | null {
  if (typeof input !== 'string' || !input.trim()) return null;
  const raw = input.trim();
  // Accept "example.com" by assuming https.
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    const ok =
      (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
    return ok ? url.href : null;
  } catch {
    return null;
  }
}
