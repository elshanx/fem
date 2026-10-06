import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  draftRecord,
  formatDate,
  formatMoney,
  generateId,
  ID_PATTERN,
  invoiceTotal,
  parseStatuses,
  readInvoiceForm,
  validateInvoice,
  type InvoiceInput,
} from './invoice.ts';

const valid: InvoiceInput = {
  description: 'Graphic Design',
  clientName: 'Alex Grim',
  clientEmail: 'alexgrim@mail.com',
  senderStreet: '19 Union Terrace',
  senderCity: 'London',
  senderPostCode: 'E1 3EZ',
  senderCountry: 'United Kingdom',
  clientStreet: '84 Church Way',
  clientCity: 'Bradford',
  clientPostCode: 'BD1 9PB',
  clientCountry: 'United Kingdom',
  createdAt: '2021-08-21',
  paymentTerms: '30',
  items: [
    { name: 'Banner Design', quantity: '1', price: '156.00' },
    { name: 'Email Design', quantity: '2', price: '200.10' },
  ],
};

test('validateInvoice accepts a complete invoice', () => {
  const result = validateInvoice(valid);
  assert.ok(result.ok);
  assert.equal(result.record.paymentDue.toISOString().slice(0, 10), '2021-09-20');
  assert.deepEqual(
    result.record.items.map((i) => [i.position, i.quantity, i.priceCents]),
    [
      [0, 1, 15600],
      [1, 2, 20010],
    ]
  );
  assert.equal(invoiceTotal(result.record.items), 55620);
});

test('validateInvoice reports each missing field', () => {
  const result = validateInvoice({
    ...valid,
    clientName: '  ',
    clientEmail: 'nope',
    paymentTerms: '5',
    items: [{ name: '', quantity: '1.5', price: '' }],
  });
  assert.ok(!result.ok);
  assert.deepEqual(result.errors, {
    clientName: "can't be empty",
    clientEmail: 'invalid email',
    paymentTerms: 'invalid',
    'items.0.name': "can't be empty",
    'items.0.quantity': 'whole numbers',
    'items.0.price': "can't be empty",
  });
});

test('validateInvoice requires an item', () => {
  const result = validateInvoice({ ...valid, items: [] });
  assert.ok(!result.ok);
  assert.deepEqual(result.errors, { items: 'An item must be added' });
});

test('draftRecord fills in defaults instead of failing', () => {
  const today = new Date('2026-01-31T00:00:00Z');
  const record = draftRecord(
    {
      ...valid,
      clientName: '',
      createdAt: '',
      paymentTerms: '',
      items: [{ name: ' Logo ', quantity: 'x', price: '-4' }],
    },
    today
  );
  assert.equal(record.clientName, '');
  assert.equal(record.createdAt, today);
  assert.equal(record.paymentTerms, 30);
  assert.equal(record.paymentDue.toISOString().slice(0, 10), '2026-03-02');
  assert.deepEqual(record.items, [{ position: 0, name: 'Logo', quantity: 0, priceCents: 0 }]);
});

test('readInvoiceForm pairs up repeated item fields', () => {
  const form = new FormData();
  form.append('clientName', 'Ann');
  ['A', 'B'].forEach((name, i) => {
    form.append('itemName', name);
    form.append('itemQuantity', String(i + 1));
    form.append('itemPrice', '9.99');
  });
  const input = readInvoiceForm(form);
  assert.equal(input.clientName, 'Ann');
  assert.equal(input.senderCity, '');
  assert.deepEqual(input.items, [
    { name: 'A', quantity: '1', price: '9.99' },
    { name: 'B', quantity: '2', price: '9.99' },
  ]);
});

test('generateId', () => {
  assert.equal(
    generateId(() => 0),
    'AA0000'
  );
  assert.equal(
    generateId(() => 0.9999),
    'ZZ9999'
  );
  for (let i = 0; i < 100; i += 1) assert.match(generateId(), ID_PATTERN);
});

test('parseStatuses', () => {
  assert.deepEqual(parseStatuses(undefined), []);
  assert.deepEqual(parseStatuses('paid,draft,bogus,paid'), ['draft', 'paid']);
  assert.deepEqual(parseStatuses(['pending', 'paid']), ['pending', 'paid']);
});

test('formatting', () => {
  assert.equal(formatMoney(180090), '£ 1,800.90');
  assert.equal(formatMoney(0), '£ 0.00');
  assert.equal(formatDate(new Date('2021-08-19T00:00:00Z')), '19 Aug 2021');
  assert.equal(formatDate(new Date('2021-09-01T00:00:00Z')), '01 Sep 2021');
});
