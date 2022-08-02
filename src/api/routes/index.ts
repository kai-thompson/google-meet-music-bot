import { Router } from "express";
import httpStatus from "http-status";

import { botManager } from "..";

const router = Router();

router.get("/ping", (_req, res) => {
  res.status(httpStatus.OK).json({ success: true });
});

router.post("/join", async (req, res) => {
  if (!req.body.url) {
    return res.status(400).send("Missing 'url' field");
  }

  const meetUrl = req.body.url;

  await botManager.createBot(meetUrl);

  res.status(httpStatus.OK);
});

export default router;
