import { Page, Browser } from "playwright";
import EventEmitter from "events";

class MusicBot {
  public url: string;
  public isDeactivated: boolean;

  public meetPage: Page;
  public browser: Browser;

  private events = new EventEmitter();

  constructor(meetUrl: string, browser: Browser, features) {
    this.url = meetUrl;
    this.browser = browser;

    for (const Feature of features) {
      const feature = new Feature(this);
      feature.connect();
    }

    this.init();
  }

  private async init() {
    console.log("Bot initializing...");
    this.meetPage = await this.browser.newPage();
    await this.join();
  }

  async join() {
    await this.meetPage.goto(this.url);

    await this.meetPage.waitForSelector('input[type="text"]');
    await this.meetPage.type('input[type="text"]', "Music Bot");

    if (await this.meetPage.$('[aria-label="Turn off camera (⌘ + e)"]')) {
      await this.meetPage.click('[aria-label="Turn off camera (⌘ + e)"]');
    }
    if (await this.meetPage.$('[aria-label="Turn off microphone (⌘ + d)"]')) {
      await this.meetPage.click('[aria-label="Turn off microphone (⌘ + d)"]');
    }

    await this.meetPage.locator("text=Ask to join").click();
    await this.meetPage.waitForSelector('[aria-label="Leave call"]');

    console.log("Bot successfully joined!");
    this.emit("joined");
  }

  shutdown() {
    this.isDeactivated = true;
  }

  on(eventName: string, callback) {
    this.events.on(eventName, callback);
  }

  emit(eventName: string, arg?: string) {
    this.events.emit(eventName, arg);
  }
}

export default MusicBot;
