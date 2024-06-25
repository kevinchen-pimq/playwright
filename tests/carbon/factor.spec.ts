import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/carbon/factor");

  await expect(page.locator(".pi-table-container")).toHaveCount(1);

  await expect(
    page.locator(".pi-table-container tr").filter({ hasText: "丁酮" })
  ).toHaveCount(0);

  await page.getByRole("button", { name: "手動新增" }).click();
  await page.getByText("排放源：").click();
  await page.locator(":focus").press("ArrowDown");
  await page.locator(":focus").fill("丁");
  await page.locator(":focus").press("ArrowDown");
  await page.locator(":focus").press("ArrowDown");
  await page.locator(":focus").press("Enter");
  await page.getByRole("button", { name: "新增", exact: true }).click();

  await expect(
    page.locator(".pi-table-container tr").filter({ hasText: "丁酮" })
  ).toHaveCount(1);
});

test("test 2", async ({ page }) => {
  await page.goto("/carbon/factor");

  await expect(page.locator(".pi-table-container")).toHaveCount(1);

  await expect(
    page.locator(".pi-table-container tr").filter({ hasText: "台灣自來水" })
  ).toHaveCount(0);

  await page.getByRole("button", { name: "手動新增" }).click();
  await page.getByText("排放源：").click();
  await page.locator(":focus").press("ArrowDown");
  await page.locator(":focus").fill("水");
  await page.locator(":focus").press("ArrowDown");
  await page.locator(":focus").press("Enter");
  await page.getByRole("button", { name: "新增", exact: true }).click();

  await expect(
    page.locator(".pi-table-container tr").filter({ hasText: "台灣自來水" })
  ).toHaveCount(1);
});
