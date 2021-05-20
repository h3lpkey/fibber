import { SET_QUEST_SCENES, SET_QUEST_SCENE, SET_QUEST_DEFAULT_STYLES } from "store/actions";

const initState = {
  scenes: {},
  scene: {},
  defaultStyles: {}
};

export const quest = (state = initState, action: any) => {
  switch (action.type) {
    case SET_QUEST_SCENES:
      return {
        ...state,
        scenes: action.payload
      };
    case SET_QUEST_SCENE:
      return {
        ...state,
        scene: action.payload
      };
    case SET_QUEST_DEFAULT_STYLES:
      return {
        ...state,
        defaultStyles: action.payload
      };
    default:
      return state;
  }
};
