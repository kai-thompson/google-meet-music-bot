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
        channel: "chrome",
        headless: false,
        args: [
            "--use-fake-ui-for-media-stream",
            "--enable-usermedia-screen-capturing",
            "--allow-http-screen-capture",
            "--auto-select-desktop-capture-source=autoPresentThisTitle",
        ],
    });
    const context = yield browser.newContext();
    const page = yield context.newPage();
    yield page.goto("https://meet.google.com/rkv-coiq-zpi");
    yield page.waitForSelector('input[type="text"]');
    yield page.type('input[type="text"]', "Music Bot");
    yield page.locator('[aria-label="Turn off camera (⌘ + e)"]').click();
    yield page.locator("text=Ask to join").click();
    const newPage = yield context.newPage();
    yield newPage.bringToFront();
    yield newPage.goto("https://soundcloud.com/biggavelipro/invincible");
    yield newPage.evaluate(() => {
        document.title = "autoPresentThisTitle";
    });
    yield page.bringToFront();
    yield page.locator('[aria-label="Present now"]').click();
    yield page.locator("text=A tab").click();
}))();
//# sourceMappingURL=index.js.map