import { test as setup, expect } from "@playwright/test";
import { statSync } from "fs";

const authFile = "playwright/.cache/.auth/user.json";

// overwrite config not show browser
setup.use({ headless: true });

setup("authenticate", async ({ request, context, baseURL }) => {
  // Send authentication request. Replace with your own.
  await request.post("/api/auth", {
    data: {
      account: "joy",
      password:
        "37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578",
    },
  });
  const storage = await request.storageState();
  await context.addCookies([
    ...storage.cookies,
    {
      name: "i18next",
      value: "zh-TW",
      domain: new URL(baseURL ?? "http://localhost").hostname,
      path: "/",
      expires: -1,
      httpOnly: false,
      secure: false,
      sameSite: "Strict",
    },
  ]);
  await context.storageState({ path: authFile });
});
