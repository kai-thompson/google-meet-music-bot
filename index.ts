import { webkit } from "playwright";

(async () => {
  const browser = await webkit.launch({
    headless: false,
    // args: ["--disable-dev-shm-usage"],
  });
  const page = await browser.newPage();

  await page.goto("https://meet.google.com/dqg-vnkg-kwz");

  await page.waitForSelector('input[type="text"]');
  await page.type('input[type="text"]', "Music Bot");

  await page.locator("text=Ask to join").click();

  // await browser.close();
})();
