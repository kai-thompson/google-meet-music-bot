import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

chromium.use(stealth());

(async () => {
  const browser = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream"],
  });

  const page = await browser.newPage();

  await page.goto("https://meet.google.com/rki-vysb-kai");

  await page.waitForSelector('input[type="text"]');
  await page.type('input[type="text"]', "Music Bot");

  await page.locator("text=Ask to join").click();

  const unMuteButton = page.locator(
    '[aria-label="Turn on microphone (⌘ + d)"]'
  );

  if (unMuteButton) await unMuteButton.click();
})();
