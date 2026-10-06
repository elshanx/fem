import { expect, test } from '@playwright/test';
import { drawer, statusBar } from './helpers';

test('status filter lives in the URL', async ({ page }) => {
  await page.goto('/');
  await page.locator('summary').click();
  await page.locator('label[for=filter-pending]').click();

  await expect(page).toHaveURL('/?status=pending');
  const badges = page.locator('a[href^="/invoice/"] span.capitalize');
  await expect(badges.first()).toBeVisible();
  const texts = await badges.allInnerTexts();
  expect(texts.map((text) => text.toLowerCase())).toEqual(texts.map(() => 'pending'));

  await page.reload();
  await expect(page.getByLabel('pending')).toBeChecked();
  await expect(page.locator('a[href^="/invoice/"]', { hasText: 'RT2080' })).toBeVisible();
  await expect(page.locator('a[href^="/invoice/"]', { hasText: 'FV2353' })).toHaveCount(0);

  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: /New/ }).click();
  await expect(page).toHaveURL('/?status=pending&new');
  await expect(drawer(page)).toBeVisible();
});

test('unknown invoice shows not found', async ({ page }) => {
  await page.goto('/invoice/XX0000');
  await expect(page.getByRole('heading', { name: 'Invoice not found' })).toBeVisible();
});

test('theme toggle switches and persists', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(html).toHaveClass(/dark/);
  await page.reload();
  await expect(html).toHaveClass(/dark/);

  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(html).not.toHaveClass(/dark/);
});

test('mobile detail page has a bottom action bar', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/invoice/RT2080');

  await expect(statusBar(page).getByRole('link', { name: 'Edit' })).toBeHidden();
  const bar = page.locator('div.sticky.bottom-0');
  await expect(bar).toBeVisible();
  const box = await bar.boundingBox();
  expect(Math.round(box!.y + box!.height)).toBe(700);

  await bar.getByRole('link', { name: 'Edit' }).click();
  await expect(drawer(page)).toBeVisible();
  await expect(page).toHaveURL('/invoice/RT2080?edit');
});
