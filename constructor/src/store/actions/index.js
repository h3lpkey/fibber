import { createAction } from "redux-actions";

export const SET_QUESTS = "SET_QUESTS";
export const SET_QUEST = "SET_QUEST";
export const SET_SCENE = "SET_SCENE";
export const SET_UI = "SET_UI";
export const SET_HEADER_TEXT = "SET_HEADER_TEXT";
export const SET_MEDIA = "SET_MEDIA";

export const setQuests = createAction(SET_QUESTS);
export const setQuest = createAction(SET_QUEST);
export const setScene = createAction(SET_SCENE);
export const setUI = createAction(SET_UI);
export const setHeaderText = createAction(SET_HEADER_TEXT);
export const setMedia = createAction(SET_MEDIA);

export const SET_GAME_PLAY = "SET_GAME_PLAY";
export const setGamePlay = createAction(SET_GAME_PLAY);
export const SET_GAME_STOP = "SET_GAME_STOP";
export const setGameStop = createAction(SET_GAME_STOP);
export const SET_GAME_PAUSE = "SET_GAME_PAUSE";
export const setGamePause = createAction(SET_GAME_PAUSE);

export const SET_GAME_MUSIC_PLAY = "SET_GAME_MUSIC_PLAY";
export const setGameMusicPlay = createAction(SET_GAME_MUSIC_PLAY);
export const SET_GAME_MUSIC_STOP = "SET_GAME_MUSIC_STOP";
export const setGameMusicStop = createAction(SET_GAME_MUSIC_STOP);
export const SET_GAME_MUSIC_TOGGLE = "SET_GAME_MUSIC_TOGGLE";
export const setGameMusicToggle = createAction(SET_GAME_MUSIC_TOGGLE);
export const ADD_GAME_TRIGGER = "ADD_GAME_TRIGGER";
export const addGameTrigger = createAction(ADD_GAME_TRIGGER);
export const CLEAR_GAME_TRIGGERS = "CLEAR_GAME_TRIGGERS";
export const clearGameTriggers = createAction(CLEAR_GAME_TRIGGERS);

export const SET_GAME_SCENE_STATUS = "SET_GAME_SCENE_STATUS";
export const setGameSceneStatus = createAction(SET_GAME_SCENE_STATUS);


export function setQuestsData(data) {
  return (dispatch) => {
    dispatch(setQuests(data));
  };
}

export function setQuestData(data) {
  return (dispatch) => {
    dispatch(setQuestData(data));
  };
}

export function setSceneData(data) {
  return (dispatch) => {
    dispatch(setScene(data));
  };
}

export function setUIData(data) {
  return (dispatch) => {
    dispatch(setUI(data));
  };
}

export function setHeader(data) {
  return (dispatch) => {
    dispatch(setHeaderText(data));
  };
}

export function setMediaData(data) {
  return (dispatch) => {
    dispatch(setMedia(data));
  };
}

export function setGameStatusPlay() {
  return (dispatch) => {
    dispatch(setGamePlay());
  };
}
export function setGameStatusStop() {
  return (dispatch) => {
    dispatch(setGameStop());
  };
}
export function setGameMusicStatusPlay() {
  return (dispatch) => {
    dispatch(setGameMusicPlay());
  };
}
export function setGameMusicStatusStop() {
  return (dispatch) => {
    dispatch(setGameMusicStop());
  };
}
export function setGameMusicStatusToggle() {
  return (dispatch) => {
    dispatch(setGameMusicToggle());
  };
}
export function doAddGameTrigger() {
  return (dispatch) => {
    dispatch(addGameTrigger());
  };
}
export function doClearGameTrigger() {
  return (dispatch) => {
    dispatch(clearGameTriggers());
  };
}
export function setGameScene() {
  return (dispatch) => {
    dispatch(setGameSceneStatus());
  };
}
