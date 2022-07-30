import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

chromium.use(stealth());

(async () => {
  const browser = await chromium.launch({
    args: ["--use-fake-ui-for-media-stream"],
  });

  const page = await browser.newPage();

  await page.goto("https://meet.google.com/vev-wnes-mpu");

  await page.waitForSelector('input[type="text"]');
  await page.type('input[type="text"]', "Music Bot");

  const turnOffCameraButton = await page.$(
    '[aria-label="Turn off camera (⌘ + e)"]'
  );
  if (turnOffCameraButton) await turnOffCameraButton.click();
  
  await page.locator("text=Ask to join").click();

  const unMuteButton = await page.$(
    '[aria-label="Turn on microphone (⌘ + d)"]'
  );
  if (unMuteButton) await unMuteButton.click();
})();
