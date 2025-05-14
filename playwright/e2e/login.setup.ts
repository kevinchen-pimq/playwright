import { test as setup } from '@playwright/test';
import { userAuthFile } from './constants';

setup('Create Auth', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: '請輸入帳號' }).fill('user');
  await page.getByRole('textbox', { name: '請輸入密碼' }).fill('password');
  await page.getByRole('button', { name: '登入' }).click();

  await page.waitForResponse(
    (resp) => resp.url().includes('/auth') && resp.status() === 200,
  );

  await page.context().storageState({ path: userAuthFile });
});
