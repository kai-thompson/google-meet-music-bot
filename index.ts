import { webkit } from "playwright";

(async () => {
  const browser = await webkit.launch({
    headless: true,
//    args: ["--use-fake-ui-for-media-stream"],
  });

  //const context = await browser.newContext({
  //  permissions: ["camera", "microphone"],
  //});
  const page = await browser.newPage();

  await page.goto("https://meet.google.com/rki-vysb-kai");

  await page.screenshot({ path: 'example.png' });

  await page.waitForSelector('input[type="text"]');
  await page.type('input[type="text"]', "Music Bot");

  await page.locator("text=Ask to join").click();

  await browser.close();
})();
