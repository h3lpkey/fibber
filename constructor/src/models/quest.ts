import { TScene } from "./scene";

export type TQuest = {
  id: number;
  Name: string;
  description: string;
  created_at: string;
  published_at: string;
  updated_at: string;
  DefaultStyles: TStyles;
  Scenes: TScene[];
};

export type TStyles = {
  Animation: TAnimation;
  BackgroundColors: {
    backgroundColor: string;
    borderColor: string;
  };
  Button: {
    backgroundColor: string;
    borderColor: string;
    id: number;
    textColor: string;
  };
  Name: string;
  id: number;
  created_at: string;
  published_at: string;
  updated_at_at: string;
};

export type TAnimation = {
  FadeAnimation: string;
  FadeDelay: number;
  FadeDuration: number;
  ShowAnimation: string;
  ShowDelay: number;
  ShowDuration: number;
};
