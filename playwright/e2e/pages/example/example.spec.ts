import { test, expect } from '@playwright/test';
import { userAuthFile } from '../../constants';

test.use({
  storageState: userAuthFile,
  // launchOptions: { slowMo: 500 },
});

/**
 * 這裡整理了常用的 playwright 測試指令
 * 這些指令可以用在測試中，讓測試更簡潔易讀
 */
test.describe('常用的 playwright 測試指令', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/entry/energyMeter');
  });

  test('一般使用', async ({ page }) => {
    /**
     * 畫面顯示 [文字內容]
     */
    const textVisible = async () => {
      await expect(page.getByText('文字內容')).toBeVisible();
    };

    /**
     * 畫面顯示多個 [文字內容]
     */
    const multipleVisible = async () => {
      await expect(
        page.getByText('文字內容').filter({ visible: true }),
      ).toHaveCount(2);
    };

    /**
     * 點擊 [按鈕名稱] 按鈕，兩種寫法二擇一，都可以用
     */
    const clickButton = async () => {
      // 建議使用這個
      await page.getByRole('button', { name: '按鈕名稱' }).click();
      // 或是用這個也可以
      await page.locator('button', { hasText: '按鈕名稱' }).click();
    };

    /**
     * 在 [搜尋...] 搜尋輸入匡輸入 [搜尋字串]
     */
    const searchInput = async () => {
      // 通常搜尋輸入匡都是使用 placeholder 標示
      await page.getByPlaceholder('搜尋...').fill('搜尋字串');
    };

    /**
     * 在 日期輸入匡 填入日期
     */
    const fillDates = async () => {
      await page.getByPlaceholder('開始日期').fill('2025/01/01');
      await page.getByPlaceholder('開始日期').press('Enter');
      await page.waitForTimeout(200); // 等待 200ms 避免日期被清空
      await page.getByPlaceholder('結束日期').fill('2025/01/01');
      await page.getByPlaceholder('結束日期').press('Enter');
    };

    /**
     * 新增成功提示，會先出現然後消失
     * 常見內容有 新增成功 完成送出成功 啟用成功
     */
    const actionSuccess = async () => {
      await expect(page.getByText('新增成功')).toBeVisible();
      await expect(page.getByText('新增成功')).toBeHidden();
    };
  });

  test('Table 表格相關操作', async ({ page }) => {
    /**
     * 畫面顯示 Table 表格
     */
    const tableVisible = async () => {
      expect(page.getByRole('table')).toBeVisible();
    };

    /**
     * 畫面顯示包含 [文字內容] 的行
     */
    const rowVisible = async () => {
      expect(page.getByRole('row', { name: '文字內容' })).toBeVisible();
    };

    /**
     * 找到包含 [搜尋文字] 的行，點擊該行的 [編輯] 按鈕
     */
    const clickRowEditButton = async () => {
      // 先 hover 讓按鈕顯示
      await page
        .getByRole('row', { name: '搜尋文字' })
        .getByRole('button', { name: '編輯' })
        .hover();
      // 等按鈕顯示後點擊按鈕
      await page
        .getByRole('row', { name: '搜尋文字' })
        .getByRole('button', { name: '編輯' })
        .click();
    };
  });

  test('Form 表單相關操作', async ({ page }) => {
    /**
     * [欄位名稱] 輸入匡輸入 [文字內容]
     */
    const fillInput = async () => {
      await page.getByLabel('欄位名稱').fill('文字內容');
      // 畫面上有兩個輸入匡 [欄位名稱] 類似時加上 exact
      await page.getByLabel('欄位名稱', { exact: true }).fill('文字內容');
      // 畫面上沒有 label 時，用 placeholder 定位輸入匡
      await page.getByPlaceholder('欄位名稱').fill('文字內容');
    };

    /**
     * 下拉選單 [欄位名稱] 選擇 [選項文字]，選擇後需要確定欄位有顯示選擇內容
     */
    const selectItem = async () => {
      await page.getByLabel('欄位名稱').click();
      await page.getByTitle('選項文字').click();
      await expect(
        page.locator('.ant-form-item', { hasText: '欄位名稱' }),
      ).toContainText('選項文字');
    };

    /**
     * 勾選 [欄位名稱] 勾選框
     * @example
     * // 勾選 隱藏停用項目
     * page.getByRole('checkbox', { name: '隱藏停用項目' }).check();
     */
    const checkCheckbox = async () => {
      // 勾選 欄位名稱
      await page.getByRole('checkbox', { name: '欄位名稱' }).check();
      // 取消勾選 欄位名稱
      await page.getByRole('checkbox', { name: '欄位名稱' }).uncheck();
    };

    /**
     * 上傳圖片
     */
    const uploadImage = async () => {
      const filePath = (await import('path')).resolve(
        __dirname,
        '../assets/record.jpg', // 圖片相對目前檔案的位置
      );
      // 執行順序不可以變更，不用 await waitForEvent
      const fileChooserPromise = page.waitForEvent('filechooser');
      await page.getByText('Upload file').click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(filePath);
    };

    /**
     * 驗證輸入匡 [欄位名稱] 選項是 [文字內容]
     */
    const inputValueIs = async () => {
      await expect(page.getByLabel('欄位名稱')).toHaveValue('文字內容');
    };

    /**
     * 驗證下拉選單 [欄位名稱] 選項是 [選項文字]
     */
    const selectValueIs = async () => {
      await expect(
        page.locator('.ant-form-item', { hasText: '欄位名稱' }),
      ).toContainText('選項文字');
    };
  });

  test('Modal 彈窗內元素操作', async ({ page }) => {
    /**
     * 驗證彈窗顯示 [彈窗名稱]
     */
    const modalTitleVisible = async () => {
      await expect(
        page.locator('.pi-modal').getByText('彈窗名稱'),
      ).toBeVisible();
    };

    /**
     * 點擊彈窗內的 [按鈕名稱] 按鈕
     */
    const clickModalButton = async () => {
      await page
        .locator('.pi-modal')
        .getByRole('button', { name: '按鈕名稱' })
        .click();
    };

    /**
     * 填寫彈窗內的 [欄位名稱] 輸入匡
     */
    const fillModalInput = async () => {
      await page.locator('.pi-modal').getByLabel('欄位名稱').fill('輸入內容');
    };
  });
});
