import { expect, test } from '@playwright/test';
import {
  createInvoice,
  drawer,
  fillInvoice,
  openByClient,
  status,
  statusBar,
  uniqueClient,
} from './helpers';

test('a draft becomes pending once completed', async ({ page }) => {
  const client = uniqueClient('draft');
  await page.goto('/?new');
  await drawer(page).locator('[name=clientName]').fill(client);
  await drawer(page).getByRole('button', { name: 'Save as Draft' }).click();
  await expect(page).toHaveURL('/');

  await openByClient(page, client);
  expect(await status(page)).toBe('draft');

  await statusBar(page).getByRole('link', { name: 'Edit' }).click();
  await expect(drawer(page).locator('[name=clientName]')).toHaveValue(client);
  await fillInvoice(drawer(page), client);
  await drawer(page).getByRole('button', { name: 'Save Changes' }).click();

  await expect(drawer(page)).toHaveCount(0);
  expect(await status(page)).toBe('pending');
  const article = page.locator('article');
  await expect(article).toContainText('10 Jan 2026');
  await expect(article).toContainText('24 Jan 2026');
  await expect(article).toContainText('£ 301.00');
});

test('Save & Send creates a pending invoice', async ({ page }) => {
  await createInvoice(page, uniqueClient('send'));
  expect(await status(page)).toBe('pending');
});

test('editing a pending invoice keeps it pending and replaces its items', async ({ page }) => {
  const client = uniqueClient('edit');
  await createInvoice(page, client);

  await statusBar(page).getByRole('link', { name: 'Edit' }).click();
  const form = drawer(page);
  await expect(form.locator('[name=itemName]')).toHaveValue('Widget');
  await expect(form.locator('select[name=paymentTerms]')).toHaveValue('14');
  await form.locator('[name=itemName]').fill('Gadget');
  await form.locator('[name=itemPrice]').fill('10');
  await form.getByRole('button', { name: 'Save Changes' }).click();

  await expect(drawer(page)).toHaveCount(0);
  expect(await status(page)).toBe('pending');
  await expect(page.locator('article')).toContainText('Gadget');
  await expect(page.locator('article')).not.toContainText('Widget');
  await expect(page.locator('article')).toContainText('£ 20.00');
});

test('Mark as Paid', async ({ page }) => {
  await createInvoice(page, uniqueClient('paid'));
  await statusBar(page).getByRole('button', { name: 'Mark as Paid' }).click();
  await expect(statusBar(page).getByText('paid', { exact: true })).toBeVisible();

  await page.reload();
  expect(await status(page)).toBe('paid');
  await expect(page.getByRole('button', { name: 'Mark as Paid' })).toHaveCount(0);
});

test('Delete asks for confirmation, then returns to the list', async ({ page }) => {
  const client = uniqueClient('delete');
  await createInvoice(page, client);
  const openDialog = () => statusBar(page).getByRole('button', { name: 'Delete' }).first().click();

  await openDialog();
  await page.locator('dialog[open]').getByRole('button', { name: 'Cancel' }).click();
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  expect(await status(page)).toBe('pending');

  await openDialog();
  await page.locator('dialog[open]').getByRole('button', { name: 'Delete' }).click();
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('link', { name: new RegExp(client) })).toHaveCount(0);
});
