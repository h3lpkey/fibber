import { TQuest } from "./quest";
import { TScene } from "./scene";
import { TUI } from "./ui";

export type StateDefault = {
  isLoading: boolean;
  error: null | {
    message: string;
    name: string;
    stack: string;
  };
};

export type StateQuests = StateDefault & {
  quests: TQuest[];
  quest: TQuest;
  scene: TScene;
};

export type StateUI = StateDefault & TUI;
export type StateMedia = StateDefault & {
  media: any[];
};
