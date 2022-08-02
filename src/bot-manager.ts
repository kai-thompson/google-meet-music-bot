import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

import MusicBot from "./bot/index";

chromium.use(stealth());

class BotManager {
  public bot = null;
  private browser = null;

  constructor() {}

  async init() {
    this.browser = await chromium.launch({
      channel: "chrome",
      headless: false,
      args: [
        "--use-fake-ui-for-media-stream",
        "--enable-usermedia-screen-capturing",
        "--allow-http-screen-capture",
        "--auto-select-desktop-capture-source=autoPresentThisTitle",
      ],
    });
  }

  async createBot(url: string) {
    this.bot = new MusicBot(url, this.browser);
  }

  getBot() {
    return this.bot;
  }
}

export default BotManager;
