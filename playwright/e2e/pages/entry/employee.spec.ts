import { test, expect } from '@playwright/test';
import { userAuthFile } from '../../constants';

test.use({
  storageState: userAuthFile,
  // launchOptions: { slowMo: 500 },
});

const ADD_DATA = {
  companyName: 'edit-companyName',
  name: 'e2e-employeeName',
  account: 'e2e-account',
  password: '123456',
} as const;

const EDIT_DATA = {
  name: 'edit-employeeName',
} as const;

test.describe('人員管理', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/entry/employee');
  });

  test.skip('人員管理 - 檢視與搜尋', async ({ page }) => {
    // TODO: Verify the presence and content of columns in the personnel list
    // TODO: Verify that the \"最後更新時間\" column is updated after editing or enabling/disabling a user.
    // TODO: Verify the search functionality (searching by 機構名稱, 機構簡稱, 用戶名稱).
    // TODO: Verify the \"隱藏已停用人員\" checkbox functionality.
  });

  test('人員管理 - 新增', async ({ page }) => {
    await page.getByRole('button', { name: '手動新增' }).click();
    await page.getByLabel('機構名稱').fill(ADD_DATA.companyName);
    await page.getByLabel('機構名稱').press('Enter');
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('機構名稱') }),
    ).toContainText(ADD_DATA.companyName);

    await page.getByLabel('姓名').fill(ADD_DATA.name);
    await page.getByLabel('帳號').fill(ADD_DATA.account);
    await page.getByLabel('密碼').fill(ADD_DATA.password);

    await page.getByRole('button', { name: '新增' }).click();
    await expect(page.getByText('完成送出成功')).toBeVisible();
    await expect(page.getByText('完成送出成功')).toBeHidden();

    await expect(
      page.getByRole('cell', { name: ADD_DATA.companyName, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: ADD_DATA.name, exact: true }),
    ).toBeVisible();
  });

  test('人員管理 - 新增 - 必填欄位驗證', async ({ page }) => {
    await page.getByRole('button', { name: '手動新增' }).click();

    // Check for error messages when required fields are empty
    await page.getByRole('button', { name: '新增' }).click();

    // Verify error messages within ant-form-item
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('機構名稱') }),
    ).toContainText('此為必填項目');
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('姓名') }),
    ).toContainText('此為必填項目');
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('帳號') }),
    ).toContainText('此為必填項目');
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('密碼') }),
    ).toContainText('此為必填項目');

    // Verify length restrictions
    const longName = 'a'.repeat(46);
    const longAccount = 'b'.repeat(46);
    const shortPassword = 'c'.repeat(5);
    const longPassword = 'd'.repeat(65);

    await page.getByLabel('姓名').fill(longName);
    await page.getByLabel('帳號').fill(longAccount);
    await page.getByLabel('密碼').fill(shortPassword);
    await page.getByRole('button', { name: '新增' }).click();

    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('姓名') }),
    ).toContainText('必須小於 45 個字');
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('帳號') }),
    ).toContainText('必須小於 45 個字');
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('密碼') }),
    ).toContainText('密碼須在6-64字符之間');

    await page.getByLabel('密碼').fill(longPassword);
    await page.getByRole('button', { name: '新增' }).click();
    await expect(
      page.locator('.ant-form-item', { has: page.getByLabel('密碼') }),
    ).toContainText('密碼須在6-64字符之間');
  });

  test('人員管理 - 編輯', async ({ page }) => {
    await page.getByRole('row', { name: ADD_DATA.name }).hover();
    await page
      .getByRole('row', { name: ADD_DATA.name })
      .getByRole('button')
      .click();

    // 編輯時機構名稱不可編輯
    await expect(page.getByLabel('機構名稱')).toBeDisabled();

    await page.getByLabel('姓名').fill(EDIT_DATA.name);

    // 編輯時帳號不可編輯
    await expect(page.getByLabel('帳號')).toBeDisabled();
    // 編輯時密碼為空
    await expect(page.getByLabel('密碼')).toBeEmpty();

    await page.getByRole('button', { name: '更新' }).click();
    await expect(page.getByText('完成送出成功')).toBeVisible();
    await expect(page.getByText('完成送出成功')).toBeHidden();

    await expect(
      page.getByRole('cell', { name: EDIT_DATA.name, exact: true }),
    ).toBeVisible();
  });

  test.skip('人員管理 - 編輯 - 機構名稱驗證', async ({ page }) => {
    // TODO: Verify that the \"機構名稱\" dropdown displays the correct options based on the user's role (後台經銷商帳號 vs. 後台一般機構帳號).
    // TODO: Verify that the \"機構名稱\" field is disabled for 後台一般機構帳號.
  });

  test.skip('人員管理 - 編輯 - 前台帳號數量驗證', async ({ page }) => {
    // TODO: Verify that the system validates against exceeding the \"前台帳號數量\" for the selected organization during creation and editing.
  });

  test('人員管理 - 停用', async ({ page }) => {
    await page.getByRole('row', { name: EDIT_DATA.name }).click();
    await page.getByRole('button', { name: '停用' }).click();

    await expect(page.getByText('停用成功')).toBeVisible();
    await expect(page.getByText('停用成功')).toBeHidden();

    await expect(page.getByRole('row', { name: EDIT_DATA.name })).toBeHidden();
  });

  test.skip('人員管理 - 啟用/停用 - 驗證前台帳號數量', async ({ page }) => {
    // TODO: Verify that 啟用帳號數量是否超過該機構「前台帳號數量」，超過阻擋
  });

  test.skip('人員管理 - 停用 - 驗證前台帳號停用', async ({ page }) => {
    // TODO: Verify that 停用後該「人員所屬的前台帳號」同時自動「停用」
  });

  test.skip('人員管理 - 批次匯入', async ({ page }) => {
    // TODO: Implement batch import test
  });

  test.skip('人員管理 - 下載', async ({ page }) => {
    // TODO: Implement download test
  });
});
