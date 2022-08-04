import MusicBot from "..";

export default async (bot: MusicBot, args: string[]): Promise<void> => {
  const newPage = await bot.browser.newPage();

  await newPage.goto(args[0]);
  await newPage.evaluate(() => {
    document.title = "autoPresentThisTitle";
  });

  await bot.meetPage.locator('[aria-label="Present now"]').click();
  await bot.meetPage.locator("text=A tab").click();
};
