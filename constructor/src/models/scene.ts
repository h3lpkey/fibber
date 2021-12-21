export type TScene = {
  Background: TBackground;
  Buttons: Tbutton[];
  Music: TMusic;
  Person: TPerson;
  PersonName: string;
  Styles: TStyles;
  Text: string;
  id: number;
  ToScenes: TToScene[];
  Notification: string;
  PersonPositionLeft: boolean;
  created_at: string;
  updated_at: string;
  x: number;
  y: number;
};

export type TBackground = {
  created_at: string;
  updated_at: string;
  ext: string;
  size: number;
  name: string;
  width: string;
  url: string;
  id: number;
  formats: {
    large: TFormat;
    medium: TFormat;
    small: TFormat;
    thumbnail: TFormat;
  };
};

type TFormat = {
  ext: string;
  hash: string;
  height: string;
  mime: string;
  name: string;
  path: string;
  size: number;
  url: string;
  width: string;
};

export type Tbutton = {
  Text: string;
  id: string;
  Scene: TScene;
  TriggerSetter: string;
  TriggerGetter: string;
  TriggerDelete: string;
};

export type TMusic = {
  created_at: string;
  updated_at: string;
  ext: string;
  hash: string;
  id: number;
  name: string;
  size: number;
  url: string;
};

export type TPerson = {
  created_at: string;
  updated_at: string;
  id: number;
  name: string;
  ext: string;
  hash: string;
  height: number;
  width: number;
  size: number;
  url: string;
  formats: {
    large: TFormat;
    medium: TFormat;
    small: TFormat;
    thumbnail: TFormat;
  };
};

export type TToScene = {
  TriggerSetter: string;
  TriggerGetter: string;
  TriggerDelete: string;
  ToScene: TScene;
};

export type TSceneStatus = "new" | "upgrade";

export type TStyles = {};
