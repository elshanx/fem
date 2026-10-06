import { expect, test } from '@playwright/test';
import { drawer } from './helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/?new');
  await expect(drawer(page)).toBeVisible();
});

test('empty Save & Send shows per-field errors and creates nothing', async ({ page }) => {
  const rowsBefore = await page.locator('a[href^="/invoice/"]').count();
  await drawer(page).getByRole('button', { name: 'Save & Send' }).click();

  await expect(drawer(page).getByRole('alert')).toContainText('All fields must be added');
  expect(await drawer(page).locator('[aria-invalid=true]').count()).toBeGreaterThanOrEqual(10);
  await expect(drawer(page).getByText("can't be empty").first()).toBeVisible();

  await page.goto('/');
  await expect(page.locator('a[href^="/invoice/"]')).toHaveCount(rowsBefore);
});

test('sending without items shows the items error', async ({ page }) => {
  await drawer(page)
    .getByRole('button', { name: /Remove/ })
    .click();
  await drawer(page).getByRole('button', { name: 'Save & Send' }).click();
  await expect(drawer(page).getByRole('alert')).toContainText('An item must be added');
});

test('item rows add, total live and remove', async ({ page }) => {
  const form = drawer(page);
  await form.getByRole('button', { name: /Add New Item/ }).click();
  await expect(form.locator('[name=itemName]')).toHaveCount(2);

  await form.locator('[name=itemQuantity]').nth(1).fill('3');
  await form.locator('[name=itemPrice]').nth(1).fill('2.50');
  await expect(form.locator('output').nth(1)).toHaveText('7.50');

  await form
    .getByRole('button', { name: /Remove/ })
    .nth(1)
    .click();
  await expect(form.locator('[name=itemName]')).toHaveCount(1);
});

test('Discard, Escape and the backdrop close the drawer', async ({ page }) => {
  await drawer(page).getByRole('button', { name: 'Discard' }).click();
  await expect(page).toHaveURL('/');
  await expect(drawer(page)).toHaveCount(0);

  await page.goto('/?new');
  await expect(drawer(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL('/');

  await page.goto('/?new');
  await expect(drawer(page)).toBeVisible();
  await page.mouse.click(1400, 450);
  await expect(page).toHaveURL('/');
});
