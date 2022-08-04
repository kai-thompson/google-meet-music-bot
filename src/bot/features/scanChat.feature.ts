import { Page } from "playwright";
import MusicBot from "..";
import { Feature } from "./types";
import config from "../../../config";

const COMMAND_PREFIX = config.COMMAND_PREFIX;

type ChatMessage = {
  messageID: string;ß
  messageContent: string;
};

class MessageManager implements Feature {
  private bot: MusicBot;
  private chatFeed = {};

  constructor(_bot: MusicBot) {
    this.bot = _bot;
  }

  connect() {
    this.bot.on("joined", () => {
      this.bot.meetPage.locator('[aria-label="Chat with everyone"]').click();

      console.log("Scanning chat...");
      this.run();
    });
  }

  async run() {
    const { meetPage } = this.bot;

    const chatItems = await meetPage.$$('[class="GDhqjd"]');

    if (chatItems.length) {
      const newMessages = await chatItems.reduce(
        async (_newChats, chatDiv): Promise<ChatMessage> => {
          const newChats = await _newChats;

          const chatTextItems = await chatDiv.$$('[class="oIy2qc"]');
          const texts = await Promise.all(
            chatTextItems.map((textDiv) =>
              textDiv.evaluate((node) => node.textContent)
            )
          );

          const timestamp = await chatDiv.evaluate((node) =>
            node.getAttribute("data-timestamp")
          );
          const sender = await chatDiv.evaluate((node) =>
            node.getAttribute("data-sender-name")
          );

          texts.forEach((text): void => {
            const messageID = `${text}${timestamp}${sender}`.trim();
            const messageContent = text;
            if (!this.chatFeed[messageID]) {
              newChats[messageID] = messageContent;
              this.chatFeed[messageID] = messageContent;
            }
          });
          return Promise.resolve(newChats);
        },
        Promise.resolve({} as ChatMessage)
      );

      if (Object.values(newMessages).length) {
        Object.values(newMessages).forEach((msg) => {
          if (msg[0] === COMMAND_PREFIX) this.bot.emit("command", msg);
        });
      }
    }

    this.run();
  }
}

export default MessageManager;
