import { StateGame } from "models/store";
import {
  ADD_GAME_TRIGGER,
  CLEAR_GAME_TRIGGERS,
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
    case ADD_GAME_TRIGGER:
      return {
        ...state,
        collectedTriggers: state.collectedTriggers.concat(action.payload),
      };
    case CLEAR_GAME_TRIGGERS:
      return {
        ...state,
        collectedTriggers: [],
      };
    default:
      return state;
  }
};
