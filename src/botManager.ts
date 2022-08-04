import fs from "node:fs";
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

import MusicBot from "./bot/index";

chromium.use(stealth());

class BotManager {
  public bot = null;
  private browser = null;

  private features = [];

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

    await this.loadFeatures();
  }

  async createBot(url: string) {
    this.bot = new MusicBot(url, this.browser, this.features);
    return this.bot;
  }

  private async loadFeatures() {
    const featureFiles = fs
      .readdirSync("src/bot/features")
      .filter((file): boolean => file.includes("feature"));

    for (const featureFile of featureFiles) {
      const feature = await import(`./bot/features/${featureFile}`);

      this.features.push(feature.default);
    }
  }
}

export default BotManager;
