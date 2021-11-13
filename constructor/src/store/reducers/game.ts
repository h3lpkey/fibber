import { StateGame } from "models/store";
import {
  SET_GAME_MUSIC_TOGGLE,
  SET_GAME_PLAY,
  SET_GAME_STOP,
} from "store/actions";

const initState = {
  isLoading: false,
  status: "pause",
  scene: "start",
  music: "pause",
  collectedTriggers: [],
  error: null,
};

export const game = (
  state: StateGame = initState,
  action: { payload: any; type: string }
): StateGame => {
  switch (action.type) {
    case SET_GAME_PLAY:
      return {
        ...state,
        status: "play",
      };
    case SET_GAME_STOP:
      return {
        ...state,
        status: "stop",
      };
    case SET_GAME_MUSIC_TOGGLE:
      return {
        ...state,
        music: state.music === "pause" ? "play" : "pause",
      };
    default:
      return state;
  }
};
