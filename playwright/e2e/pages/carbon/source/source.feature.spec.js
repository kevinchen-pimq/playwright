/** Generated from: playwright/e2e/pages/carbon/source/source.feature */
import { test } from "playwright-bdd";

test.describe("test", () => {

  test("測試資料 - 新增", { tag: ["@carbon-source"] }, async ({ Given, page }) => {
    await Given("點擊 手動新增 按鈕", null, { page });
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $testMetaMap: ({}, use) => use(testMetaMap),
  $uri: ({}, use) => use("playwright/e2e/pages/carbon/source/source.feature"),
  $bddWorldFixtures: ({ page, context, browser, browserName, request }, use) => use({ page, context, browser, browserName, request }),
  $scenarioHookFixtures: ({ page }, use) => use({ page }),
});

const testMetaMap = {
  "測試資料 - 新增": {"pickleLocation":"4:3","tags":["@carbon-source"]},
};