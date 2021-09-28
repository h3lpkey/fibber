import { TScene } from "models/scene";
import { SET_SCENE } from "store/actions";

const initState = {
  Background: {},
  Buttons: [],
  Music: {},
  Person: {},
  PersonName: "",
  SceneName: "",
  Styles: {},
  Text: "",
  id: 0,
  created_at: "",
  updated_at: "",
};

export const scene = (
  state: any = initState,
  action: { payload: any; type: string }
): TScene => {
  switch (action.type) {
    case SET_SCENE:
      return action.payload;
    default:
      return state;
  }
};
