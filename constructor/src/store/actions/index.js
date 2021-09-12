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
