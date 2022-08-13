import { Page } from "playwright";

export interface Feature {
  run: ({ meetPage, musicPage }: { [meetPage: string]: Page }) => void;
}

