import { SET_SETTINGS, SET_SETTINGS_VOLUME_LEVEL, SET_SETTINGS_VOLUME_MUTE } from "store/actions";

const initState = {
  volumeMute: false,
  volumeLevel: 0.2
};

export const settings = (state = initState, action: any) => {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state
      };
    case SET_SETTINGS_VOLUME_LEVEL:
      return {
        ...state,
        volumeLevel: action.payload
      };
    case SET_SETTINGS_VOLUME_MUTE:
      return {
        ...state,
        volumeMute: action.payload
      };

    default:
      return state;
  }
};
