import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

chromium.use(stealth());

(async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: false,
    args: [
      "--use-fake-ui-for-media-stream",
      "--enable-usermedia-screen-capturing",
      "--allow-http-screen-capture",
      "--auto-select-desktop-capture-source=autoPresentThisTitle",
    ],
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://meet.google.com/rkv-coiq-zpi");

  await page.waitForSelector('input[type="text"]');
  await page.type('input[type="text"]', "Music Bot");

  await page.locator('[aria-label="Turn off camera (⌘ + e)"]').click();

  await page.locator("text=Ask to join").click();

  const newPage = await context.newPage();

  await newPage.bringToFront();
  await newPage.goto("https://soundcloud.com/biggavelipro/invincible");
  await newPage.evaluate(() => {
    document.title = "autoPresentThisTitle";
  });
  await page.bringToFront();

  await page.locator('[aria-label="Present now"]').click();
  await page.locator("text=A tab").click();
})();
