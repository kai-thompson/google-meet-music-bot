import fs from "node:fs";

import MusicBot from "..";
import { Feature } from "./types";

class MessageManager implements Feature {
  private bot: MusicBot;
  private commands = {};

  constructor(_bot: MusicBot) {
    this.bot = _bot;
    this.init();
  }

  private async init() {
    const commandFiles = fs
      .readdirSync("src/bot/commands")
      .filter((file): boolean => file.includes("command"));

    for (const commandFile of commandFiles) {
      const command = await import(`../commands/${commandFile}`);
      const commandName = commandFile.replace(".command.ts", "");
      const Command = command.default;

      this.commands[commandName] = new Command(this.bot);
    }
  }

  connect() {
    this.bot.on("joined", () => {
      console.log("Listening for commands!");
      this.run();
    });
  }

  async run() {
    this.bot.on("command", (arg) => {
      const args = arg.substring(1).split(" ");

      const commandName = args[0];
      const passedArgs = [...args];
      passedArgs.shift();

      if (this.commands[commandName]) {
        const activeCommand = this.commands[commandName];

        activeCommand.execute(passedArgs);
      }
    });
  }
}

export default MessageManager;
