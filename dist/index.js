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
const sleep = (ms) => new Promise((r) => {
    setTimeout(r, ms);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield chromium.launch({
        args: ["--use-fake-ui-for-media-stream"],
    });
    // const context = await browser.newContext({
    //   permissions: ["microphone"],
    // });
    const page = yield browser.newPage();
    yield page.goto("https://meet.google.com/rki-vysb-kai");
    yield page.waitForSelector('input[type="text"]');
    yield page.type('input[type="text"]', "Music Bot");
    yield page.locator("text=Ask to join").click();
    // await page.locator('[aria-label="Turn on microphone (⌘ + d)"]').click();
}))();
//# sourceMappingURL=index.js.map