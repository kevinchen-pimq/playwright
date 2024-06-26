/** Generated from: playwright/e2e/pages/carbon/factor/factor.feature */
import { test } from "playwright-bdd";

test.describe("碳盤查/排放源係數管理", () => {

  test.describe("測試資料 - 新增", () => {

    test("Example #1", { tag: ["@carbon-factor"] }, async ({ Given, page, And, When }) => {
      await Given("點擊 手動新增 按鈕", null, { page });
      await And("開啟 新增排放源 modal", null, { page });
      await When("欄位 排放源 輸入 {downArrow}自來水", null, { page });
      await And("選擇 臺北自來水 選項", null, { page });
      await And("欄位 排放源 輸入 {downArrow}乾淨的煤{enter}", null, { page });
      await And("欄位 公告年份 輸入 2023", null, { page });
      await And("欄位 公司名稱 輸入 川普", null, { page });
    });

    test("Example #2", { tag: ["@carbon-factor"] }, async ({ Given, page, And, When }) => {
      await Given("點擊 手動新增 按鈕", null, { page });
      await And("開啟 新增排放源 modal", null, { page });
      await When("欄位 排放源 輸入 {downArrow}自來水", null, { page });
      await And("選擇 臺北自來水 選項", null, { page });
      await And("欄位 排放源 輸入 {downArrow}辦公室用水{enter}", null, { page });
      await And("欄位 公告年份 輸入 2020", null, { page });
      await And("欄位 公司名稱 輸入 PIMQ", null, { page });
    });

    test("Example #3", { tag: ["@carbon-factor"] }, async ({ Given, page, And, When }) => {
      await Given("點擊 手動新增 按鈕", null, { page });
      await And("開啟 新增排放源 modal", null, { page });
      await When("欄位 排放源 輸入 {downArrow}自來水", null, { page });
      await And("選擇 臺北自來水 選項", null, { page });
      await And("欄位 排放源 輸入 {downArrow}自來水(test){enter}", null, { page });
      await And("欄位 公告年份 輸入 2000", null, { page });
      await And("欄位 公司名稱 輸入 台灣自來水公司", null, { page });
    });

  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $testMetaMap: ({}, use) => use(testMetaMap),
  $uri: ({}, use) => use("playwright/e2e/pages/carbon/factor/factor.feature"),
  $bddWorldFixtures: ({ page, context, browser, browserName, request }, use) => use({ page, context, browser, browserName, request }),
  $scenarioHookFixtures: ({ page }, use) => use({ page }),
});

const testMetaMap = {
  "測試資料 - 新增|Example #1": {"pickleLocation":"19:7","tags":["@carbon-factor"]},
  "測試資料 - 新增|Example #2": {"pickleLocation":"20:7","tags":["@carbon-factor"]},
  "測試資料 - 新增|Example #3": {"pickleLocation":"21:7","tags":["@carbon-factor"]},
};