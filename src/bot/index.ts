import { Page, Browser } from "playwright";

type actionHandlerProps = {
  meetPage: Page;
  musicPage: Page;
};
type actionHandler = (actionHandlerProps) => Promise<void>;

class MusicBot {
  public url: string;
  public isDeactivated: boolean;

  private browser: Browser;
  private meetPage: Page;
  private musicPage: Page;

  private actions: actionHandler[] = [];

  constructor(meetUrl: string, browser: Browser) {
    this.url = meetUrl;
    this.browser = browser;

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
    await this.meetPage
      .locator('[aria-label="Turn off camera (⌘ + e)"]')
      .click();
    await this.meetPage.locator("text=Ask to join").click();

    console.log("Bot successfully joined!");

    this.run();
  }

  async shutdown() {
    this.isDeactivated = true;
  }

  private async run() {
    while (!this.isDeactivated) {
      const currentPendingActions = [...this.actions];
      this.actions = [];

      for (let i = currentPendingActions.length - 1; i >= 0; i--) {
        const action = currentPendingActions[i];

        await action({ meetPage: this.meetPage, musicPage: this.musicPage });
      }
    }
  }
}

export default MusicBot;
