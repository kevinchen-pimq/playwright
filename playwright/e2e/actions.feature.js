import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, When } = createBdd();

Given("點擊 {} 按鈕", async ({ page }, button) => {
  await page.click(`button:visible:has-text("${button}")`);
});

Given("開啟 {} modal", async ({ page }, modal) => {
  await page.locator(`.pi-modal:has-text("${modal}")`).waitFor();
});

When("欄位 {} 輸入 {}", async ({ page }, label, input) => {
  const inputEle = await page.getByLabel(label).and(page.locator("input"));
  const inputArr = input.split(/{|}/);

  // fix date input
  if (!(await inputEle.isEditable())) {
    await page.locator(`label:has-text("${label}")`).click();
  }

  for (let part of inputArr) {
    if (part === "") {
    } else if (part === "downArrow") {
      await inputEle.press("ArrowDown");
    } else if (part === "enter") {
      await inputEle.press("Enter");
    } else {
      // string
      await inputEle.fill(part, { force: true });
    }
  }
});

When("選擇 {} 選項", async ({ page }, label) => {
  await page.click(
    `.ant-select-item:visible:has-text("${label}"), .ant-dropdown-menu-item:visible:has-text("${label}")`
  );
});
