import { expect, type Locator, type Page } from '@playwright/test';

export const drawer = (page: Page) => page.locator('#invoice-drawer');
export const statusBar = (page: Page) => page.locator('section[aria-label=Status]');

export const uniqueClient = (label: string) => `E2E ${label} ${Date.now()}`;

export async function status(page: Page) {
  return (await statusBar(page).locator('span.capitalize').innerText()).toLowerCase();
}

export async function fillInvoice(form: Locator, clientName: string) {
  const set = (name: string, value: string) => form.locator(`[name=${name}]`).fill(value);
  const address = {
    Street: '1 Test Street',
    City: 'Baku',
    PostCode: 'AZ1000',
    Country: 'Azerbaijan',
  };
  const fields = ['sender', 'client'].flatMap((prefix) =>
    Object.entries(address).map(([key, value]) => [`${prefix}${key}`, value])
  );
  await fields.reduce(
    (prev, [name, value]) => prev.then(() => set(name, value)),
    Promise.resolve()
  );
  await set('clientName', clientName);
  await set('clientEmail', 'client@example.com');
  await set('createdAt', '2026-01-10');
  await form.locator('select[name=paymentTerms]').selectOption('14');
  await set('description', 'E2E work');
  await form.locator('[name=itemName]').first().fill('Widget');
  await form.locator('[name=itemQuantity]').first().fill('2');
  await form.locator('[name=itemPrice]').first().fill('150.50');
}

export async function openByClient(page: Page, clientName: string) {
  await page.goto('/');
  await page.getByRole('link', { name: new RegExp(clientName) }).click();
  await expect(statusBar(page)).toBeVisible();
}

export async function createInvoice(
  page: Page,
  clientName: string,
  intent: 'Save & Send' | 'Save as Draft' = 'Save & Send'
) {
  await page.goto('/?new');
  await fillInvoice(drawer(page), clientName);
  await drawer(page).getByRole('button', { name: intent }).click();
  await expect(page).toHaveURL('/');
  await openByClient(page, clientName);
}
