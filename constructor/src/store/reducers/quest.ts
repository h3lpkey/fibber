import { TQuest } from "models/quest";
import { TScene } from "models/scene";
import { StateQuests } from "models/store";
import { SET_QUEST, SET_QUESTS, SET_SCENE } from "store/actions";

const initState = {
  isLoading: true,
  quests: [],
  quest: {} as TQuest,
  scene: {} as TScene,
  error: null,
};

export const quest = (
  state: StateQuests = initState,
  action: { payload: any; type: string }
): StateQuests => {
  switch (action.type) {
    case SET_QUESTS:
      return {
        ...state,
        isLoading: false,
        quests: action.payload,
      };
    case SET_QUEST:
      return {
        ...state,
        isLoading: false,
        quest: action.payload,
      };
    case SET_SCENE:
      return {
        ...state,
        isLoading: false,
        scene: action.payload,
      };
    default:
      return state;
  }
};
