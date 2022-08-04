import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index";

import BotManager from "../botManager";

const PORT = 8080;
const app = express();

app.use(bodyParser.json());
app.use("/api", router);

export const botManager = new BotManager();

export const start = async () => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  await botManager.init();
};
