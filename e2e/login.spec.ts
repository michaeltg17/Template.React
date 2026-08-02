import { test, expect } from '@playwright/test';

test('user can login successfully', async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/');
});

test('login shows error with invalid credentials', async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('input[name="email"]', 'wrong@example.com');
  await page.fill('input[name="password"]', 'wrong');
  await page.click('button[type="submit"]');
  await expect(page.locator('.text-red-500')).toBeVisible();
});
