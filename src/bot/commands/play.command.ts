import MusicBot from "..";
import { Command } from "./types";

class PlayCommand implements Command {
  private bot: MusicBot = null;
  private songQueue: string[] = [];

  constructor(_bot: MusicBot) {
    this.bot = _bot;
  }

  async execute(args: string[]) {
    const songUrl = args[0];

    this.songQueue.push(songUrl);
    console.log(`${songUrl} queued!`);

    if (this.songQueue.length === 1) {
      this.playQueuedSong(songUrl);
    }
  }

  private async playQueuedSong(songUrl: string) {
    console.log(`Playing ${songUrl}...`);
    const musicPage = await this.bot.browser.newPage();
    const playSongButton = musicPage.locator(
      '[class="sc-button-play playButton sc-button m-stretch"]'
    );

    await musicPage.goto(songUrl);
    await musicPage.evaluate(() => {
      document.title = "autoPresentThisTitle";
    });

    await this.bot.meetPage.locator('[aria-label="Present now"]').click();
    await this.bot.meetPage.locator("text=A tab").click();

    // sketchy way of insuring song has started
    await musicPage.waitForTimeout(5000);

    if (await musicPage.$('[id="onetrust-accept-btn-handler"]')) {
      await musicPage.click('[id="onetrust-accept-btn-handler"]');
    }

    await playSongButton.waitFor({ state: "visible", timeout: 600000 });

    await musicPage.close();

    this.handlePlayNextSong();
  }

  private handlePlayNextSong() {
    this.songQueue.shift();

    if (this.songQueue.length) {
      const nextSong = this.songQueue[this.songQueue.length - 1];

      this.playQueuedSong(nextSong);
    }
  }
}

export default PlayCommand;
