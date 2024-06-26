import { createBdd } from "playwright-bdd";

const { Before } = createBdd();

Before({ tags: "@carbon-source" }, async ({ page }) => {
  await page.goto("/carbon/source");
});
