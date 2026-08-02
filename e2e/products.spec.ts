import { test, expect } from '@playwright/test';

test('admin can see products grid', async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL('/');
  await expect(page.locator('.grid')).toBeVisible();
});
