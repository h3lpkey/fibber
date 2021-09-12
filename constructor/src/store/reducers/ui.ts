import { StateUI } from "models/store";
import { SET_HEADER_TEXT, SET_UI } from "store/actions";

const initState = {
  isLoading: true,
  header: {
    text: "",
  },
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
    default:
      return state;
  }
};
