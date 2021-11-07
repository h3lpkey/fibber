import { TQuest } from "models/quest";
import { StateQuests } from "models/store";
import { SET_QUEST, SET_QUESTS } from "store/actions";

const initState = {
  isLoading: true,
  quests: [],
  quest: {} as TQuest,
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
    default:
      return state;
  }
};
