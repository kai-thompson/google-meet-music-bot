import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

chromium.use(stealth());

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ["--use-fake-ui-for-media-stream"],
  });

  const googleMeetPage = await browser.newPage();

  await googleMeetPage.goto("https://meet.google.com/fnj-dtse-orw");

  await googleMeetPage.waitForSelector('input[type="text"]');
  await googleMeetPage.type('input[type="text"]', "Music Bot");

  const turnOffCameraButton = await googleMeetPage.$(
    '[aria-label="Turn off camera (⌘ + e)"]'
  );
  if (turnOffCameraButton) await turnOffCameraButton.click();

  await googleMeetPage.locator("text=Ask to join").click();

  const unMuteButton = await googleMeetPage.$(
    '[aria-label="Turn on microphone (⌘ + d)"]'
  );
  if (unMuteButton) await unMuteButton.click();

  const soundCloudPage = await browser.newPage();
  await soundCloudPage.goto("https://soundcloud.com/biggavelipro/invincible");
  await soundCloudPage
    .locator("[class='sc-button-play playButton sc-button m-stretch']")
    .click();
})();
