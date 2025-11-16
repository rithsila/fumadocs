import { test, expect } from '@playwright/test';

test.describe('Liquid UI visual', () => {
  test('homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('home-liquid.png', {
      fullPage: true,
    });
  });

  test('docs theme page', async ({ page }) => {
    await page.goto('/docs/ui/theme');
    await expect(page).toHaveScreenshot('docs-theme-liquid.png', {
      fullPage: true,
    });
  });

  test('components buttons', async ({ page }) => {
    await page.goto('/docs/ui/components');
    await expect(page).toHaveScreenshot('components-buttons-liquid.png', {
      fullPage: true,
    });
  });
});