import { StateMedia } from "models/store";
import { SET_MEDIA } from "store/actions";

const initState = {
  isLoading: true,
  media: [],
  error: null,
};

export const media = (
  state: StateMedia = initState,
  action: { payload: any; type: string }
): StateMedia => {
  switch (action.type) {
    case SET_MEDIA:
      return {
        ...state,
        isLoading: false,
        media: action.payload,
      };
    default:
      return state;
  }
};
