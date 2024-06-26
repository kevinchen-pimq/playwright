import { createBdd } from "playwright-bdd";

const { Before } = createBdd();

Before({ tags: "@carbon-factor" }, async ({ page }) => {
  await page.goto("/carbon/factor");
});
