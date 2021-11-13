import { TGame } from "./game";
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
};

export type StateUI = StateDefault & TUI;
export type StateScene = StateDefault & TScene;
export type StateMedia = StateDefault & {
  media: any[];
};
export type StateGame = StateDefault & TGame;
