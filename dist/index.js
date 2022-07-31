var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";
chromium.use(stealth());
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield chromium.launch({
        headless: false,
        args: ["--use-fake-ui-for-media-stream"],
    });
    const googleMeetPage = yield browser.newPage();
    yield googleMeetPage.goto("https://meet.google.com/fnj-dtse-orw");
    yield googleMeetPage.waitForSelector('input[type="text"]');
    yield googleMeetPage.type('input[type="text"]', "Music Bot");
    const turnOffCameraButton = yield googleMeetPage.$('[aria-label="Turn off camera (⌘ + e)"]');
    if (turnOffCameraButton)
        yield turnOffCameraButton.click();
    yield googleMeetPage.locator("text=Ask to join").click();
    const unMuteButton = yield googleMeetPage.$('[aria-label="Turn on microphone (⌘ + d)"]');
    if (unMuteButton)
        yield unMuteButton.click();
    const soundCloudPage = yield browser.newPage();
    yield soundCloudPage.goto("https://soundcloud.com/biggavelipro/invincible");
    yield soundCloudPage
        .locator("[class='sc-button-play playButton sc-button m-stretch']")
        .click();
}))();
//# sourceMappingURL=index.js.map