import { StateUI } from "models/store";
import { SET_HEADER_TEXT, SET_UI, SET_UI_SHOW_TOOLTIPS } from "store/actions";

const initState = {
  isLoading: true,
  header: {
    text: "",
  },
  showTooltips: false,
  error: null,
};

export const ui = (
  state: StateUI = initState,
  action: { payload: any; type: string }
): StateUI => {
  switch (action.type) {
    case SET_UI:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    case SET_HEADER_TEXT:
      return {
        ...state,
        isLoading: false,
        header: {
          text: action.payload,
        },
      };
    case SET_UI_SHOW_TOOLTIPS:
      return {
        ...state,
        isLoading: false,
        showTooltips: action.payload,
      };
    default:
      return state;
  }
};
