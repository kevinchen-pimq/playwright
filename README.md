# Playwright test

### Functionality

1. Launch test browser
2. Launch test dashboard
3. Control test behavior
4. Record Video
5. Test Report

### Launch dashboard

Launch dashboard to view test running

https://playwright.dev/docs/test-ui-mode

<img src="https://github.com/microsoft/playwright/assets/13063165/6b87712f-64a5-4d73-a91d-6562b864712c">

```bash
# launch dashboard
npx playwright test --ui

# launch dashboard with browser
npx playwright test --ui --headed
# !!IMPORTANT!! ADD page.pause() IN TEST TO LAUNCH INSPECTOR

```

### Debug test

Launch browser with debugger to run test step by step

https://playwright.dev/docs/running-tests#debugging-tests

<img src="https://github.com/microsoft/playwright/assets/13063165/6b3b3caa-d258-4cb8-aa05-cd407f501626">

```bash
# launch debug
npx playwright test --debug
# debug target test
npx playwright test example.spec.ts:10 --debug
```

### Control behavior

Add tags to tests.
Focus test.
Skip test.

https://playwright.dev/docs/test-annotations

### View Report

Use cli to view report or Self host files in `playwright-report`

```
npx playwright show-report
```

### Record Test

Record user interaction to playwright commands.

```
npx playwright codegen https://backstage.dev.pimq.xyz/login
```
