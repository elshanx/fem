import { z } from 'zod';

export const STATUSES = ['draft', 'pending', 'paid'] as const;
export type Status = (typeof STATUSES)[number];

export const PAYMENT_TERMS = [1, 7, 14, 30] as const;

const ADDRESS_FIELDS = ['Street', 'City', 'PostCode', 'Country'] as const;
const TEXT_FIELDS = [
  'description',
  'clientName',
  'clientEmail',
  ...ADDRESS_FIELDS.map((f) => `sender${f}` as const),
  ...ADDRESS_FIELDS.map((f) => `client${f}` as const),
] as const;
type TextField = (typeof TEXT_FIELDS)[number];

export interface ItemInput {
  name: string;
  quantity: string;
  price: string;
}
export type InvoiceInput = Record<TextField, string> & {
  createdAt: string;
  paymentTerms: string;
  items: ItemInput[];
};

export type InvoiceRecord = Record<TextField, string> & {
  createdAt: Date;
  paymentDue: Date;
  paymentTerms: number;
  items: { position: number; name: string; quantity: number; priceCents: number }[];
};

export type FieldErrors = Record<string, string>;

const EMPTY = "can't be empty";
const required = z.string().trim().min(1, EMPTY);
const number = (schema: z.ZodNumber) =>
  required.pipe(z.coerce.number<string>({ error: 'invalid' }).pipe(schema));

const invoiceSchema = z.object({
  ...Object.fromEntries(TEXT_FIELDS.map((field) => [field, required])),
  clientEmail: required.pipe(z.email('invalid email')),
  createdAt: required.pipe(z.iso.date('invalid date')),
  paymentTerms: required.pipe(z.enum(PAYMENT_TERMS.map(String), 'invalid')),
  items: z
    .array(
      z.object({
        name: required,
        quantity: number(z.number().int('whole numbers').min(1, 'min 1').max(1_000_000)),
        price: number(z.number().min(0, 'min 0').max(10_000_000)),
      })
    )
    .min(1, 'An item must be added'),
});

export function readInvoiceForm(formData: FormData): InvoiceInput {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value : '';
  };
  const all = (key: string) => formData.getAll(key).map((v) => (typeof v === 'string' ? v : ''));
  const quantities = all('itemQuantity');
  const prices = all('itemPrice');

  return {
    ...(Object.fromEntries(TEXT_FIELDS.map((field) => [field, get(field)])) as Record<
      TextField,
      string
    >),
    createdAt: get('createdAt'),
    paymentTerms: get('paymentTerms'),
    items: all('itemName').map((name, i) => ({
      name,
      quantity: quantities[i] ?? '',
      price: prices[i] ?? '',
    })),
  };
}

export const toCents = (price: number) => Math.round(price * 100);

const DAY_MS = 24 * 60 * 60 * 1000;

export const parseDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const addDays = (date: Date, days: number) => new Date(date.getTime() + days * DAY_MS);

export const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

function toRecord(input: InvoiceInput, createdAt: Date, paymentTerms: number): InvoiceRecord {
  const text = Object.fromEntries(TEXT_FIELDS.map((f) => [f, input[f].trim()])) as Record<
    TextField,
    string
  >;
  return {
    ...text,
    createdAt,
    paymentTerms,
    paymentDue: addDays(createdAt, paymentTerms),
    items: input.items.map((item, position) => {
      const quantity = Number(item.quantity);
      const price = Number(item.price);
      return {
        position,
        name: item.name.trim(),
        quantity: Number.isSafeInteger(quantity) && quantity > 0 ? quantity : 0,
        priceCents: Number.isFinite(price) && price > 0 ? toCents(Math.min(price, 10_000_000)) : 0,
      };
    }),
  };
}

export function validateInvoice(
  input: InvoiceInput
): { ok: true; record: InvoiceRecord } | { ok: false; errors: FieldErrors } {
  const result = invoiceSchema.safeParse(input);
  if (!result.success) {
    const errors: FieldErrors = {};
    result.error.issues.forEach(({ path, message }) => {
      const key = path.join('.');
      errors[key] ??= message;
    });
    return { ok: false, errors };
  }
  return {
    ok: true,
    record: toRecord(input, parseDate(input.createdAt), Number(input.paymentTerms)),
  };
}

export function draftRecord(input: InvoiceInput, today: Date): InvoiceRecord {
  const parsedDate = z.iso.date().safeParse(input.createdAt);
  const terms = Number(input.paymentTerms);
  return toRecord(
    input,
    parsedDate.success ? parseDate(parsedDate.data) : today,
    (PAYMENT_TERMS as readonly number[]).includes(terms) ? terms : 30
  );
}

export function generateId(random = Math.random) {
  const letter = () => String.fromCharCode(65 + Math.floor(random() * 26));
  const digits = String(Math.floor(random() * 10_000)).padStart(4, '0');
  return `${letter()}${letter()}${digits}`;
}

export const ID_PATTERN = /^[A-Z]{2}\d{4}$/;

export function parseStatuses(param: string | string[] | undefined): Status[] {
  const raw = (Array.isArray(param) ? param.join(',') : (param ?? '')).split(',');
  return STATUSES.filter((status) => raw.includes(status));
}

export const itemTotal = (item: { quantity: number; priceCents: number }) =>
  item.quantity * item.priceCents;

export const invoiceTotal = (items: { quantity: number; priceCents: number }[]) =>
  items.reduce((sum, item) => sum + itemTotal(item), 0);

const money = new Intl.NumberFormat('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatAmount = (cents: number) => money.format(cents / 100);

export const formatMoney = (cents: number) => `£ ${formatAmount(cents)}`;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = (date: Date) =>
  `${String(date.getUTCDate()).padStart(2, '0')} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
