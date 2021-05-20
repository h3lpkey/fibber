import { Action, createAction } from "redux-actions";

require("dotenv").config();


export const SET_SETTINGS = "SET_SETTINGS";
export const SET_SETTINGS_VOLUME_LEVEL = "SET_SETTINGS_VOLUME_LEVEL";
export const SET_SETTINGS_VOLUME_MUTE = "SET_SETTINGS_VOLUME_MUTE";
export const SET_QUEST_SCENES = "SET_QUEST_SCENES";
export const SET_QUEST_SCENE = "SET_QUEST_SCENE";
export const SET_QUEST_DEFAULT_STYLES = "SET_QUEST_DEFAULT_STYLES";

export const setSettings = createAction(SET_SETTINGS);
export const setSettingsVolumeLevel = createAction(SET_SETTINGS_VOLUME_LEVEL);
export const setSettingsVolumeMute = createAction(SET_SETTINGS_VOLUME_MUTE);
export const setScenes = createAction(SET_QUEST_SCENES);
export const setScene = createAction(SET_QUEST_SCENE);
export const setQuestDefaultStyles = createAction(SET_QUEST_DEFAULT_STYLES);

export function setUserSettings(data: any) {
  return (dispatch: (arg0: Action<any>) => void) => {
    dispatch(setSettings(data));
  };
}

export function setVolumeLevel(data: any) {
  return (dispatch: (arg0: Action<any>) => void) => {
    dispatch(setSettingsVolumeLevel(data));
  };
}

export function setVolumeMute(data: any) {
  return (dispatch: (arg0: Action<any>) => void) => {
    dispatch(setSettingsVolumeMute(data));
  };
}

export function setQuestScenes(data: any) {
  return (dispatch: (arg0: Action<any>) => void) => {
    dispatch(setScenes(data));
  };
}

export function setCurrentScene(data: any) {
  return (dispatch: (arg0: Action<any>) => void) => {
    dispatch(setScene(data));
  };
}

export function setDefaultStyles(data: any) {
  return (dispatch: (arg0: Action<any>) => void) => {
    dispatch(setQuestDefaultStyles(data));
  };
}
