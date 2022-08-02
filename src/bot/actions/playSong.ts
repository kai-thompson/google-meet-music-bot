import { Page, BrowserContext } from "playwright";

export default async (context: BrowserContext, page: Page): Promise<void> => {
  const newPage = await context.newPage();

  await newPage.bringToFront();
  await newPage.goto("https://soundcloud.com/biggavelipro/invincible");
  await newPage.evaluate(() => {
    document.title = "autoPresentThisTitle";
  });
  await page.bringToFront();

  await page.locator('[aria-label="Present now"]').click();
  await page.locator("text=A tab").click();
};
