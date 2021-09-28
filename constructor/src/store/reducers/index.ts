import { combineReducers } from "redux";
import { media } from "./media";
import { quest } from "./quest";
import { scene } from "./scene";
import { ui } from "./ui";

const rootReducer = combineReducers({
  media,
  quest,
  scene,
  ui,
});

export default rootReducer;
