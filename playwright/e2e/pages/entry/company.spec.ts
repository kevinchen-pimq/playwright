import { test, expect } from '@playwright/test';
import { userAuthFile } from '../../constants';

test.use({
  storageState: userAuthFile,
  // launchOptions: { slowMo: 500 },
});

const ADD_DATA = {
  name: 'e2e-companyName',
  alias: 'e2e-alias',
  max_license: '4567',
  license: '87',
  account: 'e2e-account',
  password: '123456',
} as const;

const EDIT_DATA = {
  name: 'edit-companyName',
  alias: 'edit-alias',
  max_license: '5252',
  license: '77',
} as const;

test.describe('機構管理', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/entry/company');
  });

  test.skip('機構管理 - 檢視與搜尋', async ({ page }) => {
    // TODO: Verify the presence and content of columns in the personnel list
    // TODO: Verify that the \"最後更新時間\" column is updated after editing or enabling/disabling a user.
    // TODO: Verify the search functionality (searching by 機構名稱, 機構簡稱, 用戶名稱).
    // TODO: Verify the \"隱藏已停用機構\" checkbox functionality.
  });

  test('機構管理 - 新增', async ({ page }) => {
    await page.getByRole('button', { name: '手動新增' }).click();
    await page.getByLabel('機構名稱').fill(ADD_DATA.name);
    await page.getByLabel('機構簡稱').fill(ADD_DATA.alias);
    await page.getByLabel('經銷商角色').check();
    await page.getByLabel('前台帳號配額總數').fill(ADD_DATA.max_license);
    await page.getByLabel('前台帳號數量').fill(ADD_DATA.license);
    await page.getByPlaceholder('帳號', { exact: true }).fill(ADD_DATA.account);
    await page.getByPlaceholder('密碼').fill(ADD_DATA.password);

    // 畫面上有兩個新增按鈕 一個是新增帳號 一個是送出表單的新增
    await expect(page.getByRole('button', { name: '新增' })).toHaveCount(2);

    await page.getByRole('button', { name: '新增' }).nth(1).click();
    await expect(page.getByText('完成送出成功')).toBeVisible();
    await expect(page.getByText('完成送出成功')).toBeHidden();

    await expect(
      page.getByRole('cell', { name: ADD_DATA.name, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: ADD_DATA.alias, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: ADD_DATA.license, exact: true }),
    ).toBeVisible();
  });

  test('機構管理 - 編輯', async ({ page }) => {
    await page.getByRole('row', { name: ADD_DATA.name }).hover();
    await page
      .getByRole('row', { name: ADD_DATA.name })
      .getByRole('button')
      .click();

    await page.getByLabel('機構名稱').fill(EDIT_DATA.name);
    await page.getByLabel('機構簡稱').fill(EDIT_DATA.alias);
    await page.getByLabel('經銷商角色').check();
    await page.getByLabel('前台帳號配額總數').fill(EDIT_DATA.max_license);

    // 編輯時需要先點擊 edit icon 才能修改內容
    await expect(page.getByLabel('前台帳號數量')).toBeDisabled();
    await page.getByTestId('edit').click();
    await expect(page.getByLabel('前台帳號數量')).toBeEnabled();

    await page.getByLabel('前台帳號數量').fill(EDIT_DATA.license);

    // 編輯時帳號不可編輯
    await expect(page.getByPlaceholder('帳號', { exact: true })).toBeDisabled();
    // 編輯時密碼為空
    await expect(page.getByPlaceholder('密碼')).toBeEmpty();

    await page.getByRole('button', { name: '更新' }).click();
    await expect(page.getByText('完成送出成功')).toBeVisible();
    await expect(page.getByText('完成送出成功')).toBeHidden();

    await expect(
      page.getByRole('cell', { name: EDIT_DATA.name, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: EDIT_DATA.alias, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('cell', { name: EDIT_DATA.license, exact: true }),
    ).toBeVisible();
  });

  test('機構管理 - 啟用/停用', async ({ page }) => {
    await expect(
      page
        .getByRole('row', { name: EDIT_DATA.name })
        .getByRole('cell', { name: '啟用' }),
    ).toBeVisible();

    await page.getByRole('row', { name: EDIT_DATA.name }).click();
    await page.getByRole('button', { name: '停用' }).click();

    await expect(page.getByText('停用成功')).toBeVisible();
    await expect(page.getByText('停用成功')).toBeHidden();

    await expect(page.getByRole('row', { name: EDIT_DATA.name })).toBeHidden();

    await page.getByRole('checkbox', { name: '隱藏停用的項目' }).uncheck();

    await expect(
      page
        .getByRole('row', { name: EDIT_DATA.name })
        .getByRole('cell', { name: '停用' }),
    ).toBeVisible();

    await page.getByRole('row', { name: EDIT_DATA.name }).click();
    await page.getByRole('button', { name: '啟用' }).click();

    await expect(page.getByText('啟用成功')).toBeVisible();
    await expect(page.getByText('啟用成功')).toBeHidden();

    await expect(
      page
        .getByRole('row', { name: EDIT_DATA.name })
        .getByRole('cell', { name: '啟用' }),
    ).toBeVisible();
  });

  test.skip('機構管理 - 批次新增', async ({ page }) => {
    // TODO: Implement batch import test
  });

  test.skip('機構管理 - 下載', async ({ page }) => {
    // TODO: Implement download test
  });

});
